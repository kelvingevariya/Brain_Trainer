import {
  CreateUserRequest,
  GetUserRequest,
  VerifyUserRequest
} from '../../../types/api/services/users'
import {
  UsersModel
} from '../../../models'
import { NextFunction, Request, Response } from 'express'
import {
  generateVerificationIdAndLink,
  generateVerificationIdAndSendEmail
} from '../../../utils/common.util'
import { handleAdd, handleGet, handleUpdate } from '../../../utils/response-handler.util'
import {
  sendVerificationEmail,
  verifyToken
} from '../../../libs/twilio.lib'

import CONFIG from '../../../config'
import { ERRORS } from '../../../utils/errors.util'
import STRINGS from '../../../config/strings'
import { SequelizeClient } from '../../../storages/sequelize.storage'
import winston from 'winston'

const { EMAIL_EXIST, USER_NOT_FOUND } = STRINGS

const { EmailExistError, InputValidationError } = ERRORS

const { MODE } = CONFIG

export const verifyEmail = async (request: GetUserRequest, response: Response) => {
  const loggerLabel = 'verifyEmail'
  let userEmail = ''
  try {
    const { email, token: code } = request.body as { email: string, token: string }
    userEmail = email
    const verificationCheckResponse = await verifyToken({ To: email, Code: code })
    if(verificationCheckResponse.status === 'approved'){
      const user = await UsersModel.checkIfUserExists({ email })
      if(user){
        const { id } = user
        await UsersModel.updateUserData({ id, email_verified: true })
      }
      return handleGet(response)({ verified: true })
    }
    // Send email again
    await sendVerificationEmail('email', email)
    return handleGet(response)({ verified: false })
  } catch (error) {
    winston.error({ logger: loggerLabel, message: error })
    // Send email again
    await sendVerificationEmail('email', userEmail)
    return handleGet(response)({ verified: false })
  }
}

/**
 * Log in user with given email, then sends dynamic link to email.
 */
export const login = async (request: Request, response: Response, next: NextFunction) => {
  const loggerLabel = 'login'
  try {
    const { email, os = '', os_version = '', device = '', app_version = '' } = request.body

    const userData = await UsersModel.checkIfUserExists({ email })

    if (!userData) {
      return next(new InputValidationError(USER_NOT_FOUND))
    }

    const { id, emailVerified } = userData
    await UsersModel.updateUserData({ id, last_login: new Date(), os, os_version, device, app_version })
    // Create verificationId and send EMAIL
    const { verificationId, shortLink } = await generateVerificationIdAndSendEmail(email, id, userData)
    const ifVerificationIncluded = (MODE === 'development') || userData.role === 'reviewer'
    // const ifVerificationIncluded = userData.role === 'reviewer'
    const returningUser = !!(emailVerified)
    const result = {
      id,
      returningUser,
      ...ifVerificationIncluded && {
        shortLink,
        verificationId
      }
    }
    return handleGet(response)(result)
  } catch (error) {
    winston.error({
      logger: loggerLabel,
      message: error
    })
    return next(error)
  }
}

/**
 * Creates user with given email, then sends dynamic link to email.
 * CreateUser will be executed transactionaly, so failure at any point won't create partial user
 */
export const createUser = async (request: CreateUserRequest, response: Response, next: NextFunction) => {
  const transaction = await SequelizeClient.transaction()
  const loggerLabel = 'create-user'
  try {
    const { email, os = '', os_version = '', device = '', app_version = '', source } = request.body

    let userData = await UsersModel.checkIfUserExists({ email }, transaction)

    if (userData) {
      await transaction.rollback()
      return next(new EmailExistError(EMAIL_EXIST))
    }
    const updateParams = { email, os, os_version, device, app_version, source, last_login: new Date() }

    userData = await UsersModel.createUser(updateParams, transaction)
    const { id } = userData
    // Create verificationId and send EMAIL
    const { verificationId, shortLink } = await generateVerificationIdAndLink(email, id)
    const result = {
      id,
      shortLink,
      verificationId
    }
    await transaction.commit()
    return handleAdd(response)(result)
  } catch (error) {
    winston.error({
      logger: loggerLabel,
      message: error
    })
    await transaction.rollback()
    return next(error)
  }
}

/**
 * Verify user logic when getting deeplink request back.
 */
export const verifyUser = (request: VerifyUserRequest, response: Response) => {
  handleUpdate(response)()
}
