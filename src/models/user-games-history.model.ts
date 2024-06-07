import { UserGamesHistoryCreationAttributes } from '../types/models/user-games-history'
import { UserGamesHistory, UserTodayGames, Users } from './definitions'

Users.hasMany(UserTodayGames, { sourceKey: 'id', foreignKey: 'user_id' })
UserTodayGames.belongsTo(Users, { foreignKey: 'user_id' })

Users.hasMany(UserGamesHistory, { sourceKey: 'id', foreignKey: 'game_id' })
UserGamesHistory.belongsTo(Users, { foreignKey: 'game_id' })

/**
 * Create user today games.
 */
export const createUserGamesHistory = (params: UserGamesHistoryCreationAttributes) => {
  return UserGamesHistory.create(params)
}
