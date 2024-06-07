import { DataTypes, ModelDefined } from 'sequelize'

import { SequelizeClient } from '../../storages'
import { UserGamesHistoryAttributes, UserGamesHistoryCreationAttributes } from '../../types/models/user-games-history'

export const UserGamesHistory: ModelDefined<UserGamesHistoryAttributes, UserGamesHistoryCreationAttributes>= SequelizeClient.define(
  'user_games_history',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    moves_in_parallel: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    obstacle_penalties: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: 'user_games_history',
    timestamps: true
  }
)
