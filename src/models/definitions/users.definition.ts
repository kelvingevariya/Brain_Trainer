import { DataTypes, ModelDefined } from 'sequelize'
import { UsersAttributes, UsersCreationAttributes } from '../../types/models/users'
import { SequelizeClient } from '../../storages'
import { StatusEnum } from '../../config/enums/status.enum'

export const Users: ModelDefined<UsersAttributes, UsersCreationAttributes>= SequelizeClient.define(
  'users',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true
    },
    phone_number: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: true
    },
    full_name: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    email_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    phone_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    status: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: StatusEnum.Active
    },
    role: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: 'member'
    },
    stripe_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    payment_method_attached: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    source: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    version: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    social_user_id: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: true
    },
    social_platform: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    os: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    os_version: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    app_version: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    device: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    gps_permission: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    microphone_permission: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    push_permission: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    email_permission: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    reengagement_email_permission: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    daily_push_permission: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    camera_permission: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    contacts_permission: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    tableName: 'users',
    timestamps: true
  }
)
