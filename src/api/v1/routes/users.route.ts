import * as UsersService from '../services/users.services'

import {
  AuthorizationMiddleware
} from '../../../middleware'

import { Router } from 'express'
import passport from 'passport'
import { UsersValidationMiddleware } from '../../../middleware/validation'

const router = Router()

router.post('/',
// #swagger.tags = ['Users']
  UsersValidationMiddleware.validateCreateUserArgs,
  UsersService.createUser
)

router.post('/verify',
// #swagger.tags = ['Users']
  UsersValidationMiddleware.validateVerifyEmailArgs,
  UsersService.verifyEmail
)
router.post('/login',
// #swagger.tags = ['Users']
  UsersValidationMiddleware.validateLoginUserArgs,
  UsersService.login
)

router.post('/:id/verify/:verificationId',
// #swagger.tags = ['Users']
  UsersValidationMiddleware.validateVerifyUserArgs,
  passport.authenticate('custom', { session: true }),
  UsersService.verifyUser
)

/**
 * Authorize user for accessing endpoints below.
 */
router.use(AuthorizationMiddleware.authorizeUser)

export default router
