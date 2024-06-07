import cors from 'cors'
import ConnectRedis from 'connect-redis'
import { Request, Response, NextFunction } from 'express'
import session from 'express-session'
import morgan from 'morgan'

import { ERRORS } from '../utils/errors.util'

import { RedisClient } from '../storages'

import CONFIG from '../config'
import STRINGS from '../config/strings'
import winston, { stream } from 'winston'

const { PathNotFoundError } = ERRORS
const { RESOURCE_DOESNT_EXIST } = STRINGS

const { SESSION } = CONFIG
const { SECRET, MAX_AGE } = SESSION

/**
 * Init Redis store with session.
 */
const RedisStore = ConnectRedis(session)

/**
 * Cors middleware.
 */
export const corsMiddleware = cors({
  origin: '*', // TODO: modify this for future needs
  credentials: true,
  exposedHeaders: ['set-cookie'],
  optionsSuccessStatus: 200
})

/**
 * Session middleware.
 */
export const sessionMiddleware = session({
  store: new RedisStore({ client: RedisClient }),
  secret: SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: MAX_AGE
  }
})

/**
 * Send `204` response for serving favicon.
 */
export const faviconMiddleware = (request: Request, response: Response) => response.status(204)

/**
 * Passes `PathNotFound` error to next handler.
 */
export const pathNotFoundMiddleware = (request: Request, response: Response, next: NextFunction) => {
  const { url } = request

  next(new PathNotFoundError(RESOURCE_DOESNT_EXIST(url)))
}

/**
 * Logger which checks if original url is AWS's `health`, then skips logging.
 */
export const logger = (request: Request, response: Response, next: NextFunction) => {
  winston.configure({
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.label(),
      winston.format.json()
    ),
    transports: [new winston.transports.Console()]
  })
  const logger = morgan('combined', { stream: { write: message => winston.info(message) }})

  if (request.originalUrl === '/health') {
    return next()
  }

  return logger(request, response, next)
}
