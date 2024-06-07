import { UserTodayGamesCreationAttributes } from '../types/models/user-today-games'
import { UserGamesHistory, UserTodayGames, Users } from './definitions'

Users.hasMany(UserTodayGames, { sourceKey: 'id', foreignKey: 'user_id' })
UserTodayGames.belongsTo(Users, { foreignKey: 'user_id' })

Users.hasMany(UserGamesHistory, { sourceKey: 'id', foreignKey: 'game_id' })
UserGamesHistory.belongsTo(Users, { foreignKey: 'game_id' })

/**
 * Create user today games.
 */
export const createUserTodayGames = (params: UserTodayGamesCreationAttributes[]) => {
  return UserTodayGames.bulkCreate(params)
}
