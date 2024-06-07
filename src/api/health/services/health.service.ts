import { Request, Response } from 'express'

/**
 * Returns `OK` response for letting AWS know that server is alive.
 */
export const returnSuccessStatus = (request: Request, response: Response) => {
  response.send('OK')
}
