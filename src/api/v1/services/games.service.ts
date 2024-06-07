import { NextFunction, Response, Request } from 'express'
import winston from 'winston'
import moment from 'moment-timezone'

import { handleGet } from '../../../utils/response-handler.util'
import { GamesModel, UserGamesHistoryModel, UserTodayGamesModel } from '../../../models'
import { UserData } from '../../../types/models/users'

/**
 * get games.
 */
export const getGames = async (request: Request, response: Response, next: NextFunction) => {
  const loggerLabel = 'get-games'
  try {
    const { id } = request.user as UserData
    const skills = await GamesModel.getRandomSkills()
    const skilledGames = await Promise.all(skills.map((skill: any) => GamesModel.getRandomGameBySkill(skill.id)))
    const gamesData = skilledGames.map((game: any) => ({
      user_id: id,
      game_id: game.id,
      date: moment().format('YYYY-MM-DD'),
      is_completed: false,
      level: game.levels
    }))
    // Bulk create user today's games
    await UserTodayGamesModel.createUserTodayGames(gamesData)
    return handleGet(response)({ games: skilledGames })
  } catch (error) {
    winston.error({
      logger: loggerLabel,
      message: error
    })
    return next(error)
  }
}

/**
 * get skilled games.
 */
export const getSkilledGames = async (request: Request, response: Response, next: NextFunction) => {
  const loggerLabel = 'get-skilled-games'
  try {
    // Fetch 3 random skills
    const skills = await GamesModel.getRandomSkills()

    // Fetch 2 random games for each skill
    const skillGames = await Promise.all(
      skills.map(async (skill) => {
        const games = await GamesModel.getRandomGamesBySkill(skill.id)
        return {
          skill,
          games
        }
      })
    )

    const selectedGameIds = skillGames
      .flatMap((skillGame: { games: any }) => skillGame.games)
      .map((game: { id: any }) => game.id)

    // Fetch one recommended game that is not in the selected games
    const recommendedGame = await GamesModel.getRecommendedGame(selectedGameIds)
    return handleGet(response)({  skillGames, recommendedGame })
  } catch (error) {
    winston.error({
      logger: loggerLabel,
      message: error
    })
    return next(error)
  }
}

/**
 * Create user game history
 */
export const createUserGameHistory = async (request: Request, response: Response, next: NextFunction) => {
  const loggerLabel = 'create-user-game-history'
  try {
    const { id } = request.user as UserData
    const { gameId, isCompleted, level, movesInParallel, obstaclePenalties } = request.body

    const gameRecordId = await UserGamesHistoryModel.createUserGamesHistory({
      user_id: id,
      game_id: gameId,
      date: moment().format('YYYY-MM-DD'),
      level,
      isCompleted,
      moves_in_parallel: movesInParallel,
      obstacle_penalties: obstaclePenalties
    })
    return handleGet(response)({ gameRecordId })
  } catch (error) {
    winston.error({
      logger: loggerLabel,
      message: error
    })
    return next(error)
  }
}
