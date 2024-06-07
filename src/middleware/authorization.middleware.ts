import { NextFunction, Request, Response } from 'express'
import { RedisModel, UsersModel } from '../models'
import { SocketNext, SocketObject, SocketRequest } from '../types/libs/sockets'

import CONFIG from '../config'
import { ERRORS } from '../utils/errors.util'
import STRINGS from '../config/strings'
import { UserData } from '../types/models/users'
import { getSIDFromCookies } from '../utils/cookie.util'
import winston from 'winston'

const { USER_STATUSES } = CONFIG
const { NEGATIVE } = USER_STATUSES

const { UnauthorizedError, NoPermissionError } = ERRORS
const { NOT_LOGGED, NOT_ENOUGH_PERMISSION } = STRINGS

/**
 * Checks if user is authenticated, then passes request to next handler, otherwise rejects.
 */
export const authorizeUser = (request: Request, response: Response, next: NextFunction) => {
  if (request.user) {
    const { id } = request.user as UserData

    return UsersModel.getUserInfo(id)
      .then((user) => {
        request.logIn(user, (error) => {
          if (error) {
            const loggerLabel = 'middleware:authorizeUser'

            winston.error({
              label: loggerLabel,
              message: error
            })
            return next(new UnauthorizedError(NOT_LOGGED))
          }
        })

        winston.configure({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.label(),
            winston.format.json()
          ),
          transports: [new winston.transports.Console()],
          defaultMeta: { user_id: id }
        })

        return next()
      })
  }

  if (request.headers.authorization) {
    const sid = getSIDFromCookies(request.headers.authorization)

    return RedisModel.getUserFromSessionBySID(sid)
      .then((user) => {
        request.user = user

        return next()
      })
      .catch(next)
  }

  return next(new UnauthorizedError(NOT_LOGGED))
}

/**
 * Checks if `session` authenticated, then passes to next handler.
 * Otherwise rejects with `UnauthorizedError`.
 */
export const authorizeSocketConnection = (socket: SocketObject, next: SocketNext) => {
  const request = socket.request as SocketRequest

  if (request.user) {
    return next()
  }

  return next()
  // return next(new UnauthorizedError(NOT_LOGGED))
}

/**
 * Checks if `user.status` is from negative cases, then rejects with `NoPermissionError`.
 */
export const checkIfUserIsActive = (request: Request, response: Response, next: NextFunction) => {
  const user = request.user as UserData

  if (NEGATIVE.includes(user.status)) {
    return next(new NoPermissionError(NOT_ENOUGH_PERMISSION))
  }

  return next()
}