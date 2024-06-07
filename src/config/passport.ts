import passport from 'passport'
import { Strategy, VerifyCallback } from 'passport-custom'

import { UsersModel, RedisModel } from '../models'

import { ERRORS } from '../utils/errors.util'

import STRINGS from '../config/strings'

const { UserNotFoundError, InvalidVerificationLinkError } = ERRORS
const { USER_NOT_FOUND, LINK_EXPIRED } = STRINGS

/**
 * Phone number authorization strategy.
 *
 * Checks if user with givne `id` exists or not.
 * If it is, then checks if `verificationId` is match.
 * Otherwise rejects with user not found error.
 */
const loginProcessor: VerifyCallback = (request, done) => {
  const id = parseInt(request.params.id)
  const verificationId: string = request.params.verificationId

  UsersModel.checkIfUserExists({ id })
    .then((userData) => {
      if (userData) {
        return RedisModel.getUserData(userData.id)
          .then((initialVerificationId) => {
            if (!initialVerificationId || verificationId !== initialVerificationId) {
              return done(new InvalidVerificationLinkError(LINK_EXPIRED))
            }

            return RedisModel.expireUserData({
              userId: userData.id,
              verificationId: verificationId
            })
              .then(() => UsersModel.verifyUser(id))
              .then(() => done(null, userData))
          })
      }

      return done(new UserNotFoundError(USER_NOT_FOUND))
    })
}

passport.use('custom', new Strategy(loginProcessor))
