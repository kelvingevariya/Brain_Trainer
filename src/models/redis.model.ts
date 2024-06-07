import { RedisClient } from '../storages'

import CONFIG from '../config'
import STRINGS from '../config/strings'

import { ERRORS } from '../utils/errors.util'

const { REDIS } = CONFIG
const {
  VERIFICATION_EXPIRE,
  VERIFICATION_EXPIRE_MANUAL,
  SOCKET_KEY_PATTERN,
  VERIFICATION_KEY_PATTERN,
  SESSION_KEY_PATTERN
} = REDIS
const { USER_NOT_FOUND } = STRINGS

const { UserNotFoundError } = ERRORS

type StoreUserDataParams = {
  userId: number,
  verificationId: string
}

/**
 * Stores `user id` and `verificationId` pair in redis.
 */
export const storeUserData = (params: StoreUserDataParams) => {
  const { userId, verificationId } = params

  return RedisClient.setex(REDIS.VERIFICATION_KEY_PATTERN(userId), VERIFICATION_EXPIRE, verificationId)
}

/**
 * Debugging Redis
 */
// export const storeUserData = (params: StoreUserDataParams): Promise<void> => {
//   const { userId, verificationId } = params
//   const key = REDIS.VERIFICATION_KEY_PATTERN(userId)

//   // Logging for debugging
//   console.log('Storing data in Redis:', { key, verificationId, VERIFICATION_EXPIRE })

//   // Use `set` with `EX` option
//   return RedisClient.set(key, verificationId, 'EX', VERIFICATION_EXPIRE)
//     .then(response => {
//       console.log('Redis set response:', response)
//     })
//     .catch(error => {
//       console.error('Redis set error:', error)
//       throw error
//     })
// }

/**
 * Remove `user id` and `verificationId` pair from redis.
 */
export const expireUserData = (params: StoreUserDataParams) => {
  const { userId } = params

  return RedisClient.expire(VERIFICATION_KEY_PATTERN(userId), VERIFICATION_EXPIRE_MANUAL)
}

/**
 * Gets user data by `user id` key.
 */
export const getUserData = (userId: number) => RedisClient.get(VERIFICATION_KEY_PATTERN(userId))

/**
 * Stores user's socket id in Redis.
 */
export const setUserSocketId = (userId: number, socketId: string) =>
  RedisClient.set(SOCKET_KEY_PATTERN(userId), socketId)

/**
 * Store key:value in Redis.
 */
export const setKeyValue = (key: string, value: string) => RedisClient.set(key, value)
/**
 * Get value of key from Redis.
 */
export const getKeyValue = (key: string) => RedisClient.get(key)
/**
 * Delete value of key from Redis.
 */
export const delKeyValue = (key: string) => RedisClient.del(key)

/**
 * Retrieves socket id for given `userId`.
 */
export const getUserSocketId = (userId: number) => RedisClient.get(SOCKET_KEY_PATTERN(userId))

/**
 * Checks if `sid` is valid, then tries to get user by session `sid`.
 * If user found, returns user data, otherwise rejects with `UserNotFoundError`.
 */
export const getUserFromSessionBySID = (sid: string | false) => {
  if (sid) {
    return RedisClient.get(SESSION_KEY_PATTERN(sid))
      .then((response) => {
        if (response) {
          return JSON.parse(response)
        }

        return Promise.reject(new UserNotFoundError(USER_NOT_FOUND))
      })
      .then((data) => data.passport.user)
  }

  return Promise.reject(new UserNotFoundError(USER_NOT_FOUND))
}

/**
 * Removes user from redis session if `sid` is valid.
 * Otherwise rejects with `UserNotFoundError`.
 */
export const removeUserFromSession = (sid: string | false) => {
  if (sid) {
    return RedisClient.del([SESSION_KEY_PATTERN(sid)])
  }

  return Promise.reject(new UserNotFoundError(USER_NOT_FOUND))
}
