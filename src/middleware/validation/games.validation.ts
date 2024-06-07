import { NextFunction, Response } from 'express'

import Joi from '@hapi/joi'
import { validate } from '../../utils/validation.util'

export const validateServeGameArgs = (request: Request, response: Response, next: NextFunction) => {
  validate(request, { body: request.body },
    Joi.object({
      body: {
        gameId: Joi.number().required(),
        isCompleted: Joi.boolean().required,
        level: Joi.number().required,
        movesInParallel: Joi.number().required,
        obstaclePenalties: Joi.number().required
      }
    }),
    next
  )
}
