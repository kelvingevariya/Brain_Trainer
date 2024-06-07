import crypto from 'crypto'


/**
 * @private
 * Generates unique salt with `crypto` native module.
 */
const uniqueSalt = () => crypto.randomBytes(16).toString('hex')

/**
 * @private
 * Generates hash using `crypto` native module.
 */
const hashInfo = (info: string, salt: string) => crypto.pbkdf2Sync(info, salt, 10000, 512, 'sha512')
  .toString('hex')

/**
 * Generates verification id based on email.
 */
export const generateVerificationId = (email: string) => {
  const salt = uniqueSalt()

  return hashInfo(email, salt)
}

/**
 * SHA256 hash of the Uber webhook request body as a message, using the client secret as the key.
 */
// export const generateUberSignature = (webhookBody: UberWebhookEvent) => crypto.createHmac('sha256', CLIENT_SECRET)
//   .update(JSON.stringify(webhookBody)).digest('hex')

/**
 * SHA256 hash of the Zendesk webhook request body as a message, using the client secret as the key.
 */
export const generateZendeskSignature = (webhookBody: string, webhookSecret: string) => crypto.createHmac('sha256', webhookSecret)
  .update(webhookBody).digest('base64')
