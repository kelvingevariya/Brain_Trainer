import { DataTypes, ModelDefined } from 'sequelize'

import { SequelizeClient } from '../../storages'
import { StatusEnum } from '../../config/enums/status.enum'
import { GamesAttributes, GamesCreationAttributes } from '../../types/models/games'

export const Games: ModelDefined<GamesAttributes, GamesCreationAttributes>= SequelizeClient.define(
  'games',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: StatusEnum.Active
    },
    icon: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    goals: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    instruction: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    levels: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    skill_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: 'games',
    timestamps: true
  }
)
