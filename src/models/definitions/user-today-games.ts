import { DataTypes, ModelDefined } from 'sequelize'

import { SequelizeClient } from '../../storages'
import { UserTodayGamesAttributes, UserTodayGamesCreationAttributes } from '../../types/models/user-today-games'

export const UserTodayGames: ModelDefined<UserTodayGamesAttributes, UserTodayGamesCreationAttributes>= SequelizeClient.define(
  'user_today_games',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
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
    is_completed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: 'user_today_games',
    timestamps: true
  }
)
