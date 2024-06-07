import axios, { AxiosRequestConfig } from 'axios'

import CONFIG from '../config'
import { ERRORS } from '../utils/errors.util'
import { Twilio } from 'twilio'
import { VerifyCodeParams } from '../types/libs/twilio'
import { getAxiosResponseData } from '../utils/axios.util'
import qs from 'qs'

const { TWILIO, SENDGRID, MODE, VERIFICATION_HOST } = CONFIG

const { EMAIL_VERIFICATION_TEMPLATE, FROM_EMAIL } = SENDGRID
const {
  ACCOUNT_SID,
  TOKEN,
  FROM,
  SERVICE_ID,
  URL
} = TWILIO

const { PhoneLookupError, VerificationServiceError } = ERRORS

const twilio = new Twilio(ACCOUNT_SID, TOKEN)

type SendDynamicLinkMessageParams = {
  to: string,
  message: string
}

const axiosApiInstance = axios.create()
axiosApiInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  config.baseURL = URL
  config.headers = {
    'Authorization': 'Basic ' + Buffer.from(ACCOUNT_SID + ':' + TOKEN).toString('base64'),
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  return config
}, (error) => Promise.reject(error))

/**
 * Lookup given phone number.
 */
export const lookup = (phoneNumber: string) => {
  return twilio.lookups.v1.phoneNumbers(phoneNumber)
    .fetch({ type: ['carrier'] })
    .then(phone_number => phone_number.carrier)
    .catch((error) => Promise.reject(new PhoneLookupError(error.message)))
}

/**
 * Sends given `message` to given `to` phone number.
 */
export const sendMessage = (params: SendDynamicLinkMessageParams) => {
  const { to, message } = params
  return lookup(to)
    .then(() => twilio.messages.create({
      from: FROM,
      to,
      body: message
    }))
    .catch((error) => Promise.reject(new PhoneLookupError(error.message)))
}

/**
 * Send verification token.
 */
export const sendVerificationTokenOld = (channel: string, phoneNumber: string) => {
  return twilio.verify.v2.services(SERVICE_ID)
    .verifications.create({ to: phoneNumber, channel })
    .then(verification => verification)
    .catch((error) => Promise.reject(new VerificationServiceError(error.message)))
}
/**
 * Send verification token with axios. // Twillio library was not returning SNA object in response, that's why used axios
 */
export const sendVerificationToken = async (channel: string, phoneNumber: string) => {
  const queryParams = qs.stringify({ 'Channel': channel, 'To': phoneNumber })
  return axiosApiInstance.post(`${SERVICE_ID}/Verifications`, queryParams)
    .then(getAxiosResponseData)
    .catch((error) => Promise.reject(new VerificationServiceError(error.message)))
}
/**
 * Send verification token with axios. // Twillio library was not returning SNA object in response, that's why used axios
 */
export const sendVerificationEmail = async (channel: string, email: string, userData?: {fullName: string}) => {
  const channelConfiguration = {
    template_id: EMAIL_VERIFICATION_TEMPLATE,
    from: FROM_EMAIL,
    substitutions: {
      env: MODE,
      user_name: userData?.fullName || 'User',
      email: encodeURIComponent(email),
      verification_url: `${VERIFICATION_HOST}`
    }
  }
  return twilio.verify.v2.services(SERVICE_ID)
    .verifications.create({ channelConfiguration, 'channel': channel, 'to': email })
    .then(verification => verification)
    .catch((error) => Promise.reject(new VerificationServiceError(error.message)))
}

/**
 * Verify token.
 */
export const verifyToken = (params: VerifyCodeParams) => {
  const queryParams = qs.stringify(params)
  return axiosApiInstance.post(`${SERVICE_ID}/VerificationCheck`, queryParams)
    .then(getAxiosResponseData)
    .catch((error) => Promise.reject(new VerificationServiceError(error.message)))
}
