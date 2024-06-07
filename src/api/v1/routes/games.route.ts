import { Router } from 'express'

import * as GamesService from '../services/games.service'
// import { GamesValidationMiddleware } from '../../../middleware/validation'

const router = Router()

router.get('/today-games',
  GamesService.getGames
)

router.get('/skilled-games',
  GamesService.getSkilledGames
)

router.post('/create-game-history',
//   GamesValidationMiddleware.validateServeGameArgs,
  GamesService.createUserGameHistory
)

export default router
