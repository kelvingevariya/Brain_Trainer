import { generateVerificationLink } from '../libs/dynamic-link.lib'

import { sendMessage } from '../libs/twilio.lib'

import { RedisModel } from '../models'

import { generateVerificationId } from './authorization.util'

import STRINGS from '../config/strings'

import { sendMail } from '../libs/send-grid.lib'

const { WELCOME_MESSAGE } = STRINGS

import CONFIG from '../config'
import { UserData } from '../types/models/users'

const { SENDGRID } = CONFIG

const { LOGIN_EMAIL_VERIFICATION_TEMPLATE } = SENDGRID

/**
 * Generate random number array
 */
export const generateRandomNumberArray = (maxLimit = 10) => {
  const arr = []
  while(arr.length < maxLimit){
    const r = Math.floor(Math.random() * maxLimit) + 1
    if(arr.indexOf(r) === -1) {
      arr.push(r)
    }
  }
  return arr
}

/**
 * Generate verificationId and store in Redis
 */
export const generateVerificationIdAndStore = async (email: string, userId: number) => {
  try {
    const verificationId = await generateVerificationId(email)
    await RedisModel.storeUserData({ userId, verificationId })
    return verificationId
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * Generate verificationId and send sms
 */
export const generateVerificationIdAndSendSMS = async (phoneNumber: string, userId: number, message?: string) => {
  try {
    const verificationId = await generateVerificationIdAndStore(phoneNumber, userId)
    const dynamicLinkData = await generateVerificationLink(userId, verificationId)
    const { shortLink } = dynamicLinkData
    const smsMessage = message ? `${message} \n \n${shortLink}` : `${WELCOME_MESSAGE} \n \n${shortLink}`
    await sendMessage({ to: phoneNumber, message: smsMessage })
    return { verificationId, shortLink }
  } catch (error) {
    return Promise.reject(error)
  }
}
/**
 * Generate verificationId and send verification email
 */
export const generateVerificationIdAndSendEmail = async (email: string, userId: number, userData: UserData) => {
  try {
    const verificationId = await generateVerificationIdAndStore(email, userId)
    const dynamicLinkData = await generateVerificationLink(userId, verificationId)
    const { shortLink } = dynamicLinkData
    // Send email
    await sendMail({ emailData: { verification_url: shortLink, user_name: userData.fullName || 'User' }, email, templateId: LOGIN_EMAIL_VERIFICATION_TEMPLATE })
    return { verificationId, shortLink }
  } catch (error) {
    return Promise.reject(error)
  }
}
/**
 * Generate verificationId
 */
export const generateVerificationIdAndLink = async (email: string, userId: number) => {
  try {
    const verificationId = await generateVerificationIdAndStore(email, userId)
    const dynamicLinkData = await generateVerificationLink(userId, verificationId)
    const { shortLink } = dynamicLinkData
    return { verificationId, shortLink }
  } catch (error) {
    return Promise.reject(error)
  }
}
