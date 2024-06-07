import cookie from 'cookie'
import cookieParser from 'cookie-parser'

import CONFIG from '../config'

const { SESSION } = CONFIG
const { SECRET } = SESSION

/**
 * Parses given `cookieString`, then returns `sid`.
 */
export const getSIDFromCookies = (cookieString: string) => {
  const parsedCookie = cookie.parse(cookieString)

  return cookieParser.signedCookie(parsedCookie['connect.sid'], SECRET)
}
