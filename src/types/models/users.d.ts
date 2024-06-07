import { Optional } from 'sequelize/types'
import { StatusEnum } from '../../config/enums/status.enum'
import { json } from 'sequelize'

export interface UsersAttributes {
  id: number,
  email: string,
  phone_number: string,
  full_name: string,
  email_verified: boolean,
  phone_verified: boolean,
  status: string,
  role: string,
  stripe_id: string,
  payment_method_attached: boolean,
  source: json,
  version: string,
  os: string,
  os_version: string,
  app_version: string,
  device: string,
  gps_permission: boolean,
  microphone_permission: boolean,
  push_permission: boolean,
  camera_permission: boolean,
  reengagement_email_permission: boolean,
  daily_push_permission: boolean,
  contacts_permission: boolean,
  last_login: Date,
  social_user_id: string,
  social_platform: string
}

type UserOptionalColumns = 'id' | 'phone_number' | 'full_name' | 'email' | 'stripe_id' | 'email_verified' | 'phone_verified' | 'status' | 'role'
| 'payment_method_attached' | 'source' | 'version' | 'os' | 'os_version' | 'app_version' | 'device' | 'gps_permission' | 'microphone_permission'
| 'push_permission' | 'camera_permission' | 'contacts_permission' | 'reengagement_email_permission' | 'daily_push_permission' | 'last_login' | 'social_user_id' | 'social_platform'

export type UsersCreationAttributes = Optional<UsersAttributes, UserOptionalColumns>

export type UpdateUserDataParams = {
  id: number,
  fullName?: string,
  email?: string,
  stripeId?: string,
  phoneNumber?: string,
  role?: string,
  paymentMethodAttached?: boolean,
  status?: StatusEnum,
  gps_permission?: boolean
  microphone_permission?: boolean,
  push_permission?: boolean,
  os?: string,
  os_version?: string,
  app_version?: string,
  device?: string,
  email_verified?: boolean,
  phone_verified?: boolean,
  camera_permission?: boolean,
  contacts_permission?: boolean,
  reengagement_email_permission?: boolean,
  daily_push_permission?: boolean,
  last_login?: Date,
}

export type UserData = {
  phoneNumber: string,
  verificationId: string,
  id: number,
  fullName: string,
  email: string,
  emailVerified: boolean,
  role: string,
  status: string,
  stripeId: string,
  paymentMethodAttached: boolean,
  appVersion: string,
  isAnswersGiven?: boolean,
  fineTuningItemsSelectionCompleted?: boolean,
  topicFormatSourceSelectionCompleted?: boolean,
  createdAt: Date,
  updatedAt: Date
}

export type SearchExistenceParams = {
  phoneNumber?: string,
  email?: string,
  social_user_id?: string,
  social_platform?: string,
  id?: number
}

export type CreateUserParams = {
  status?: string,
  id?: number,
  email: string,
  role?: string,
  os?: string,
  email_verified?: boolean,
  os_version?: string,
  app_version?: string,
  version?: string,
  device?: string,
  source?: json,
  last_login: Date,
  social_user_id?: string,
  social_platform?: string
}

export type CreateGuestUserParams = {
  status?: string,
  id?: number,
  version?: string,
  source?: json
}
