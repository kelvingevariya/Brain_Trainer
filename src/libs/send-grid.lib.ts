import CONFIG from '../config'
import Client from '@sendgrid/client'
import { SendMailParams } from '../types/libs/sendgrid'
import sgMail from '@sendgrid/mail'
import winston from 'winston'

const { SENDGRID } = CONFIG

const { FROM_EMAIL, FROM_NAME, SENDGRID_KEY } = SENDGRID

sgMail.setApiKey(SENDGRID_KEY)
Client.setApiKey(SENDGRID_KEY)

export const sendMail = async (params: SendMailParams) => {
  const loggerLabel = 'sendgrid-send-mail'
  try {
    const { email, templateId, emailData, groupId } = params
    let msg = {
      to: email,
      from: { email: FROM_EMAIL, name: FROM_NAME },
      templateId: templateId,
      dynamicTemplateData: emailData
    }
    if(groupId){
      msg = { ...msg, ...groupId }
    }
    return await sgMail.send(msg)
  } catch (error) {
    winston.error({
      logger: loggerLabel,
      message: error
    })
    return Promise.reject(error)
  }
}
export const resubscribeToGroup = async (params: any) => {
  const loggerLabel = 'sendgrid-resubscribe-group'
  try {
    const { group_id, email } = params
    const request: any = { method: 'DELETE', url: `/v3/asm/groups/${group_id}/suppressions/${email}` }
    return await Client.request(request)
  } catch (error) {
    winston.error({
      logger: loggerLabel,
      message: error
    })
    return Promise.reject(error)
  }
}
