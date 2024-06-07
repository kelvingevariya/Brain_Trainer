import Joi from '@hapi/joi'
import { NextFunction } from 'express'

import { ERRORS } from './errors.util'

import CONFIG from '../config'

const { VALIDATIONS: { DEFAULT_OPTIONS }} = CONFIG
const { InputValidationError } = ERRORS

/**
 * Validates input with given `schema`. `Request` object is used to modify data after validation.
 */
export const validate = (request: any, parameters: any, schema: Joi.Schema, next: NextFunction) => {
  const { value, error } = schema.validate(parameters, DEFAULT_OPTIONS)

  if (error) {
    const message = error && error.details && error.details[0] && error.details[0].message

    return next(new InputValidationError(message))
  }

  if (value) {
    const keys = Object.keys(parameters)
    keys.forEach((key) => {
      request[key] = value[key]
    })
  }

  next()
}
