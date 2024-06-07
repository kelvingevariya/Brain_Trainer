import { Server } from 'http'

import express, { NextFunction, Request, Response } from 'express'
import helmet from 'helmet'
import passport from 'passport'
import { Server as SocketServer } from 'socket.io'

import ApiV1 from './api/v1'
import ApiHealth from './api/health'
import swaggerUi  from 'swagger-ui-express'
import swaggerDocument from '../swagger.json'


import {
  ErrorHandlerMiddleware,
  AuthorizationMiddleware,
  CommonMiddleware
} from './middleware'

import { socketBuilder } from './libs/socket.lib'

import { withDeserializeStrategy, withSerializeStrategy } from './utils/passport.util'

import { wrap } from './utils/sockets.util'

import basicAuth from 'basic-auth'

import CONFIG from './config'

const { AUTH, MODE } = CONFIG

// HTTP Authentication
const auth = function (request: Request, response: Response, next: NextFunction) {
  const user = basicAuth(request)
  if (!user || !user.name || !user.pass) {
    response.set('WWW-Authenticate', 'Basic realm=Authorization Required')
    response.sendStatus(401)
    return
  }
  if (user.name === AUTH.HTTP_AUTH_USER && user.pass === AUTH.HTTP_AUTH_PASSWORD) {
    next()
  } else {
    response.set('WWW-Authenticate', 'Basic realm=Authorization Required')
    response.sendStatus(401)
    return
  }
}
/**
 * Init application.
 */
const app = express()
const server = new Server(app)
const io = new SocketServer(server, { transports: ['websocket'] })

app.use(express.static('public'))
/**
 * Middleware - cors.
 */
app.use(CommonMiddleware.corsMiddleware)

/**
 * Middleware - setup a logger.
 */
app.use(CommonMiddleware.logger)

/**
 * Middleware - Init session.
 */
app.use(CommonMiddleware.sessionMiddleware)

/**
 * Init passport. Custom strategy is required from config.
 */
require('./config/passport')
app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser(withSerializeStrategy)
passport.deserializeUser(withDeserializeStrategy)

/**
 * Attach socket middleware.
 */
io.use(wrap(CommonMiddleware.sessionMiddleware))
io.use(wrap(passport.initialize()))
io.use(wrap(passport.session()))
io.use(AuthorizationMiddleware.authorizeSocketConnection)

/**
 * Pass socket object to instance builder.
 */
socketBuilder(io)

/**
 * Disable `x-powered-by` header.
 */
app.disable('x-powered-by')

/**
 * Middleware - body parser:
 * Parses the text as URL encoded data (limit 5 mb).
 * Parses the text as JSON & exposes the resulting object on req.body (limit 5 mb).
 */
app.use(express.urlencoded({ limit: '5mb', extended: false }))
app.use(express.json({ limit: '5mb' }))

/**
 * Middleware - Helmet:
 * Helps to secure app by setting HTTP headers.
 */
app.use(helmet())


/**
 * Initialize API Health endpoint.
 */
app.use('/health', ApiHealth)

/**
 * Initialize API v1 endpoints.
 */
app.use('/api/v1', ApiV1)

/**
 * Handle favicon request.
 */
app.get('/favicon.ico', CommonMiddleware.faviconMiddleware)

/**
 * Handle swagger document request.
 */
if(MODE === 'development'){
  app.use('/swagger-doc', auth, swaggerUi.serve, swaggerUi.setup(swaggerDocument))
}

/**
 * Middleware - catch 404 and forward to error handler.
 */
app.use(CommonMiddleware.pathNotFoundMiddleware)

/**
 * Middleware for catching errors and forwarding to error handler.
 */
app.use(ErrorHandlerMiddleware)

export default { app, server }
