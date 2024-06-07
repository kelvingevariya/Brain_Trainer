import { NextFunction, Request, Response } from 'express'

import winston from 'winston'

import CONFIG from '../config'

import { ErrorCases, MiddlewareError } from '../types/middleware/error-handler'

const { RETRY_AFTER_HEADER } = CONFIG

/**
 * Error cases for error handling middleware.
 */
const ERROR_CASES: ErrorCases = {
  DatabaseQueryError: {
    statusCode: 400,
    errorCode: 'InvalidData'
  },
  DynamicLinkError: {
    statusCode: 400,
    errorCode: 'DynamicLink'
  },
  FareEstimateExpiredError: {
    statusCode: 409,
    errorCode: 'FareEstimateExpired'
  },
  HighFareError: {
    statusCode: 409,
    errorCode: 'SurgePricing'
  },
  InputValidationError: {
    statusCode: 400,
    errorCode: 'InvalidInput'
  },
  EmailExistError: {
    statusCode: 400,
    errorCode: 'EmailAlreadyExist'
  },
  NoPermissionError: {
    statusCode: 403,
    errorCode: 'AccessRestricted'
  },
  PaymentError: {
    statusCode: 400,
    errorCode: 'PaymentFailure'
  },
  PathNotFoundError: {
    statusCode: 404,
    errorCode: 'NotFound'
  },
  ResourceNotFoundError: {
    statusCode: 404,
    errorCode: 'NotFound'
  },
  SMSProviderError: {
    statusCode: 404,
    errorCode: 'InvalidCredentials'
  },
  PhoneLookupError: {
    statusCode: 422,
    errorCode: 'InvalidCredentials'
  },
  DuplicatePhoneError: {
    statusCode: 400,
    errorCode: 'DuplicatePhoneError'
  },
  UnauthorizedError: {
    statusCode: 401,
    errorCode: 'Unauthorized'
  },
  UserNotFoundError: {
    statusCode: 404,
    errorCode: 'UserNotFound'
  },
  TaxiProviderError: {
    statusCode: 404,
    errorCode: 'TaxiProviderError'
  },
  InvalidVerificationLinkError: {
    statusCode: 408,
    errorCode: 'InvalidVerificationLinkError'
  },
  SequelizeDatabaseError: {
    statusCode: 500,
    errorCode: 'SequelizeDatabaseError'
  },
  SequelizeDatabaseSyncError: {
    statusCode: 500,
    errorCode: 'SequelizeDatabaseSyncError'
  },
  SequelizeConnectionAcquireTimeoutError: {
    statusCode: 500,
    errorCode: 'SequelizeConnectionAcquireTimeoutError'
  },
  VerificationServiceError: {
    statusCode: 500,
    errorCode: 'VerificationServiceError'
  },
  ZoomError: {
    statusCode: 400,
    errorCode: 'ZoomError'
  },
  DEFAULT: {
    statusCode: 500,
    errorCode: 'InternalError',
    errorMessage: 'The server encountered an internal error. Try again later.'
  },
  FileNotFound: {
    statusCode: 404,
    errorCode: 'FileNotFound'
  },
  FolderNotFound: {
    statusCode: 404,
    errorCode: 'FolderNotFound'
  },
  TaskNotFound: {
    statusCode: 404,
    errorCode: 'TaskNotFound'
  },
  FileRequired: {
    statusCode: 400,
    errorCode: 'FileRequired'
  }
}

/**
 * Error handler middleware function.
 */
export const ErrorHandlerMiddleware = (error: MiddlewareError, request: Request, response: Response, next: NextFunction) => {
  const ERROR_CASE = ERROR_CASES[error.name] || ERROR_CASES.DEFAULT
  const loggerLabel = 'middleware:ErrorHandlerMiddleware'

  const errorResponse = {
    status: ERROR_CASE.statusCode,
    code: ERROR_CASE.errorCode,
    message: ERROR_CASE.errorMessage || error.message
  }

  if(error?.response?.status){
    errorResponse.status = error.response.status
    errorResponse.code = error?.response?.data?.error?.code ? error.response.data.error.code : errorResponse.code
    errorResponse.message = error?.response?.data?.error?.description ? error.response.data.error.description : errorResponse.message
  }

  // temp. log to explore and add more cases.
  if (errorResponse.status >= 400 || errorResponse.status === 500) {
    winston.error({
      label: loggerLabel,
      message: error
    })
  }

  if (errorResponse.status === 503) {
    response.setHeader('Retry-After', RETRY_AFTER_HEADER)
  }

  response.status(errorResponse.status).json(errorResponse)
}
