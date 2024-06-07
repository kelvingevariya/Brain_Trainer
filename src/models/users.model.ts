import {
  CreateUserParams,
  SearchExistenceParams,
  UpdateUserDataParams,
  UserData
} from '../types/models/users'
import { Op, Transaction } from 'sequelize'
import { parseCreateResponse, parseGetResponse } from '../utils/database.util'

import CONFIG from '../config'
import { StatusEnum } from '../config/enums/status.enum'
import { Users } from './definitions'
import { resubscribeToGroup } from '../libs/send-grid.lib'

const { SENDGRID } = CONFIG
const { DAILY_DIGEST_UNSUBSCRIBE_GROUP_ID } = SENDGRID

/**
 * Get user info with given user `id`.
 */
export const getUserInfo = (id: number): Promise<UserData> => Users.findByPk(id)
  .then(parseGetResponse)

/**
 * Get all users.
 */
export const getUsers = (): Promise<UserData[]> => Users.findAll()
  .then((results) => results.map(parseGetResponse)) as Promise<UserData[]>

/**
 * Get users for sending push.
 */
export const getUsersForPush = (): Promise<UserData[]> => Users.findAll(
  {
    where: { daily_push_permission: true, status: StatusEnum.Active }
  })
  .then((results) => results.map(parseGetResponse)) as Promise<UserData[]>

/**
 * Get test users for sending push.
 */
export const getTestUsersForPush = (ids: Array<number>): Promise<UserData[]> => Users.findAll(
  {
    where: { daily_push_permission: true, status: StatusEnum.Active, id: { [Op.in]: ids }}
  })
  .then((results) => results.map(parseGetResponse)) as Promise<UserData[]>

/**
 * Get users role wise.
 */
export const getUsersByRole = (): Promise<UserData[]> => Users.findAll({ where: { role: 'admin' }})
  .then((results) => results.map(parseGetResponse)) as Promise<UserData[]>

/**
 * Get users for sending mail.
 */
export const getUsersForSendingMail = (): Promise<UserData[]> => Users.findAll({
  where: { reengagement_email_permission: true, email_verified: true, status: StatusEnum.Active }
}).then((results) => results.map(parseGetResponse)) as Promise<UserData[]>

/**
 * Checks existence of user with given phone number or id.
 */
export const checkIfUserExists = (searchParams: SearchExistenceParams, transaction?: Transaction): Promise<UserData | null> => {
  const id = searchParams.id
  const phone_number = searchParams.phoneNumber
  const social_platform = searchParams.social_platform
  const social_user_id = searchParams.social_user_id
  const email = searchParams.email
  const withCriteria = {
    where: {
      ...phone_number && { phone_number },
      ...id && { id },
      ...email && { email },
      ...social_platform && { social_platform },
      ...social_user_id && { social_user_id }
    },
    ...transaction && { transaction }
  }

  return Users.findOne(withCriteria)
    .then(parseGetResponse)
}

/**
 * Fetches user data by given `stripeId`.
 */
export const getUserByStripeId = (stripeId: string) => {
  const withCriteria = {
    where: {
      stripe_id: stripeId
    }
  }

  return Users.findOne(withCriteria)
    .then(parseGetResponse)
}

/**
 * Fetches user data by given `zendeskTicketId`.
 */
export const getUserByZendeskTicketId = (zendeskTicketId: string) => {
  const withCriteria = {
    where: {
      zendesk_ticket_id: zendeskTicketId
    }
  }

  return Users.findOne(withCriteria)
    .then(parseGetResponse)
}

/**
 * Fetches user data by given `phone_number`.
 */
export const getUserByPhoneNumber = (phoneNumber: string) => {
  const withCriteria = {
    where: {
      phone_number: phoneNumber
    }
  }

  return Users.findOne(withCriteria)
    .then(parseGetResponse)
}

/**
 * Creates user record in database with given phone number.
 */
export const createUser = (params: CreateUserParams, transaction: Transaction): Promise<UserData> => {
  const { email, id, version, role, os, os_version, app_version, device, source, last_login, social_platform, social_user_id, email_verified } = params
  const userData = {
    id,
    ...email && { email },
    ...version && { version },
    ...role && { role },
    ...os && { os },
    ...os_version && { os_version },
    ...app_version && { app_version },
    ...device && { device },
    ...source && { source },
    ...last_login && { last_login },
    ...social_platform && { social_platform },
    ...social_user_id && { social_user_id },
    ...typeof email_verified === 'boolean' && { email_verified }
  }
  return Users.upsert(userData, { transaction })
    .then(([data]) => parseCreateResponse(data))
}

/**
 * Verify user. Changes `emailVerified` db field to true.
 */
export const verifyUser = (id: number) => {
  const withData = {
    // email_verified: true,
    status: StatusEnum.Active
  }
  const andCriteria = {
    where: {
      id
    }
  }

  return Users.update(withData, andCriteria)
}

/**
 * Sets user status to `paused`.
 */
export const pauseUser = (id: number) => {
  const withData = {
    status: 'paused'
  }
  const andCriteria = {
    where: {
      id
    }
  }

  return Users.update(withData, andCriteria)
}

/**
 * Updates existing user data if it is verified.
 */
export const updateUserData = async (params: UpdateUserDataParams, transaction?: Transaction) => {
  try {
    const { email, id } = params
    const full_name = params.fullName
    const stripe_id = params.stripeId
    const phone_number = params.phoneNumber
    const role = params.role
    const os = params.os
    const os_version = params.os_version
    const device = params.device
    const app_version = params.app_version
    const last_login = params.last_login
    const gps_permission = params.gps_permission
    const microphone_permission =  params.microphone_permission
    const push_permission = params.push_permission
    const email_verified = params.email_verified
    const phone_verified = params.phone_verified
    const camera_permission =  params.camera_permission
    const contacts_permission = params.contacts_permission
    const reengagement_email_permission = params.reengagement_email_permission
    const daily_push_permission = params.daily_push_permission

    const payment_method_attached = params.paymentMethodAttached

    const withData = {
      ...email && { email },
      ...full_name && { full_name },
      ...stripe_id && { stripe_id },
      ...phone_number && { phone_number },
      ...role && { role },
      ...payment_method_attached && { payment_method_attached },
      ...os && { os },
      ...os_version && { os_version },
      ...device && { device },
      ...app_version && { app_version },
      ...typeof gps_permission === 'boolean' && { gps_permission },
      ...typeof microphone_permission === 'boolean' && { microphone_permission },
      ...typeof push_permission === 'boolean' && { push_permission },
      ...typeof email_verified === 'boolean' && { email_verified },
      ...typeof phone_verified === 'boolean' && { phone_verified },
      ...typeof camera_permission === 'boolean' && { camera_permission },
      ...typeof contacts_permission === 'boolean' && { contacts_permission },
      ...typeof daily_push_permission === 'boolean' && { daily_push_permission },
      ...typeof reengagement_email_permission === 'boolean' && { reengagement_email_permission },
      ...last_login && { last_login }
    }
    const andCriteria = {
      where: {
        id
      },
      raw: true,
      ...transaction && { transaction }
    }

    // If user update reengagement_email_permission from application, then update that setting in sendgrid also
    if(reengagement_email_permission && email){
      await resubscribeToGroup({ email, group_id: DAILY_DIGEST_UNSUBSCRIBE_GROUP_ID })
    }
    return await Users.update(withData, andCriteria)
  } catch (error) {
    console.log('error', error)
    return Promise.reject(error)
  }
}

/**
 * Deletes user by given id.
 */
export const deleteUser = (id: number) => {
  const withData = {
    status: 'inactive'
  }
  const andCriteria = {
    where: {
      id
    }
  }

  return Users.update(withData, andCriteria)
}

/**
 * Checks if there is no user data, then gets user information by userIdForSupport.
 */
export const getUserDataForSupport = (user: UserData | undefined, userIdForSupport: number) => {
  if (!user) {
    return getUserInfo(userIdForSupport)
  }

  return Promise.resolve(user)
}
