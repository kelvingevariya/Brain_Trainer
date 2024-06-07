import { Optional } from 'sequelize/types'

export interface UserTodayGamesAttributes {
  id: number,
  user_id: number,
  game_id: number,
  date: Date,
  is_completed: boolean,
  level: number
}

type UserTodayGamesOptionalColumns = 'id'

export type UserTodayGamesCreationAttributes = Optional<UserTodayGamesAttributes, UserTodayGamesOptionalColumns>

export interface FlattenUserTodayGamesAttributes {
    id: number,
    userId: number,
    gameId: number,
    date: Date,
    isCompleted: boolean,
    level: number
}
