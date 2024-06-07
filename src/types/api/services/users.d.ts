import { Request } from 'express'
import { json } from 'sequelize'

export type GetUserRequest = Request

export interface CreateUserRequest extends Request {
  body: {
    email: string,
    os?: string,
    os_version?: string,
    device?: string,
    app_version?: string,
    source?: JSON
    social_platform?: string
    social_user_id?: string
  }
}

interface VerifyUser extends Request<{id: number}> {
  body: {
    verificationId: string
  }
}

export type VerifyUserRequest = VerifyUser & Request

interface UpdateUser extends Request {
  body: {
    fullName: string,
    email: string
  }
}

interface UpdateGuestUser extends Request {
  body: {
    fullName: string,
    email: string,
    phoneNumber: string,
    os?: string,
    os_version?: string,
    device?: string,
    app_version?: string,
    gps_permission?: boolean,
    microphone_permission?: boolean,
    push_permission?: boolean,
    camera_permission?: boolean,
    contacts_permission?: boolean,
    email_verified?: boolean,
    phone_verified?: boolean
  }
}

export type UpdateUserRequest =  UpdateUser & UpdateGuestUser & Request
