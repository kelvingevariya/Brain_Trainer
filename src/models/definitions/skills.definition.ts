import { DataTypes, ModelDefined } from 'sequelize'

import { SequelizeClient } from '../../storages'
import { StatusEnum } from '../../config/enums/status.enum'
import { SkillsAttributes, SkillsCreationAttributes } from '../../types/models/skills'

export const Skills: ModelDefined<SkillsAttributes, SkillsCreationAttributes>= SequelizeClient.define(
  'skills',
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
    }
  },
  {
    tableName: 'skills',
    timestamps: true
  }
)
