import {
  GetUserRequest,
  VerifyUserRequest
} from '../../types/api/services/users'
import { NextFunction, Response } from 'express'
import CONFIG from '../../config'

import Joi from '@hapi/joi'
import { validate } from '../../utils/validation.util'

const { VALIDATIONS } = CONFIG
const { DB_MAX_INTEGER_VALUE } = VALIDATIONS

export const validateCreateUserArgs = (request: GetUserRequest, response: Response, next: NextFunction) => {
  validate(request, { body: request.body },
    Joi.object({
      body: {
        email: Joi.string().email().required(),
        app_version: Joi.string(),
        device: Joi.string(),
        os_version: Joi.string(),
        os: Joi.string(),
        source: Joi.string().optional()
      }
    }),
    next
  )
}

export const validateVerifyEmailArgs = (request: GetUserRequest, response: Response, next: NextFunction) => {
  validate(request, { body: request.body },
    Joi.object({
      body: {
        email: Joi.string().email().required(),
        token: Joi.string().required()
      }
    }),
    next
  )
}
export const validateLoginUserArgs = (request: GetUserRequest, response: Response, next: NextFunction) => {
  validate(request, { body: request.body },
    Joi.object({
      body: {
        email: Joi.string().email().required(),
        app_version: Joi.string(),
        device: Joi.string(),
        os_version: Joi.string(),
        os: Joi.string(),
        isSendNew: Joi.boolean().optional()
      }
    }),
    next
  )
}

export const validateVerifyUserArgs = (request: VerifyUserRequest, response: Response, next: NextFunction) => {
  validate(request, { params: request.params },
    Joi.object({
      params: {
        id: Joi.number().max(DB_MAX_INTEGER_VALUE).required(),
        verificationId: Joi.string().required()
      }
    }),
    next
  )
}
