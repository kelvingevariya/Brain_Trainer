import { Optional } from 'sequelize/types'

export interface UserGamesHistoryAttributes {
  id: number,
  user_id: number,
  game_id: number,
  date: Date,
  level: number,
  moves_in_parallel: number,
  obstacle_penalties: number
}

type UserGamesHistoryOptionalColumns = 'id'

export type UserGamesHistoryCreationAttributes = Optional<UserGamesHistoryAttributes, UserGamesHistoryOptionalColumns>

export interface FlattenUserGamesHistoryAttributes {
    id: number,
    userId: number,
    gameId: number,
    date: Date,
    isCompleted: boolean,
    level: number,
    movesInParallel: number,
    obstaclePenalties: number
}
