export default {
  USER_NOT_FOUND: 'This user does not exist.',
  RECORD_NOT_FOUND: 'This record does not exist',
  EMAIL_EXIST: 'User with this email already exist.',
  SETTINGS_NOT_FOUND: 'Settings not found.',
  PLEASE_UPLOAD_FILE: 'Please upload file.',
  TECH_EXPERT_REQUEST_NOT_FOUND: 'Tech expert request not found.',
  NOT_LOGGED: 'You should log in before accessing API.',
  RESOURCE_DOESNT_EXIST: (url: string) => `The specified resource path ${url} does not exist.`,
  UBER_NOT_AVAILABLE: 'Service is not available.',
  NO_ATTACHED_PAYMENT: 'Payment method is not attached.',
  LINK_EXPIRED: 'Your verification link is expired or does not exist.',
  NO_ATTACHED_PAYMENT_BEFORE_ORDERING: 'Please attach card before ordering service.',
  STATE_INSERT_CONFLICT: 'Impossible to update! Invalid next state.',
  PROMOTION_NOT_FOUND: 'Promotion code not found.',
  PROMOTION_ACCESS_DENIED: 'Promotion is not assigned to this user.',
  PROMOTION_NOT_ASSIGNABLE: 'This promotion code is not assignable.',
  PROMOTION_ALREADY_ASSIGNED: 'Promotion code is already assigned to this user.',
  MAX_ASSIGNMENT_LIMIT_REACHED: 'Maximum assignment limit reached for this promotion code.',
  MAX_USAGE_LIMIT_REACHED: 'Maximum usage limit reached for this promotion code.',
  ASSIGNMENT_TIME_EXPIRED: 'Promotion assignment time limit expired.',
  PROMOTION_EXPIRED: 'Promotion expired.',
  LOCATION_OR_LATITUDE_LONGITUDE_REQUIRED: 'Either one of Location or ( Latitude and Lontitude ) required',
  NOTES_FOR_DRIVER: `This ride was booked through the Squire app. You cannot message or text customers directly. Please call your rider when you arrive.`,
  PROMOTION_ASSIGNMENT: (firstName: string, promotion_code: string) => `Congratulations ${firstName}, you have received promotion code
    ${promotion_code}. Hurry up!! avail it for your next order.`,
  WELCOME_MESSAGE: `Hello, this is an automated message from Squire.

Please click the link below to verify your number.

Once you click, we\'ll automatically take you back to the Squire app to finish the setup process.`,
  WELCOME_MESSAGE_BY_REP: (firstName: string, agentName: string) => `Hello ${firstName}, this is a message from ${agentName}, your live Squire agent.

Please click the link below to verify your phone number.

Once you do, you will be taken back to the Squire portal.`,

  RECEIPT_MESSAGE: (url: string) => `Thank you for choosing Squire to book your ride today.

Click the following link for your receipt: ${url}.

Questions or concerns? Call us at 1 (855) 519-2858`,

  RECEIPT_MESSAGE_TECH_EXPERT: (url: string) => `Thank you for choosing Squire to book tech expert.

Click the following link for your receipt: ${url}.

Questions or concerns? Call us at 1 (855) 519-2858`,

  RECEIPT_MESSAGE_FLOWER: (url: string, receipentFullName: string, deliveryDate: string, receipentAddress: string) => `Thank you for choosing Squire to order flowers.

Your order to send flowers to ${receipentFullName}, on ${deliveryDate} at ${receipentAddress} has been received and we are working on it.

Click the following link for your receipt: ${url}.

Questions or concerns? Call us at 1 (855) 519-2858`,

  NOT_ENOUGH_PERMISSION: 'This user does not have access. Please contact support.',
  NO_SIGNATURE_FOUND: 'Stripe signature not found.',
  INVALID_TYPE: 'Support ticket type is not valid.',
  PAUSED_USER: (id: number) => `The user with id ${id} is paused. Please investigate case.`,
  DUPLICATE_PHONE_NUMBER: 'This phone number is already registered in our system, please contact our support',
  FILE_NOT_EXIST: 'The requested file not exist',
  FOLDER_NOT_EXIST: 'The folder not exist',
  TASK_NOT_EXIST: 'The task not exist with given id',
  NO_RESTAURANT_FOUND: 'No restaurant found.',
  FILE_REQUIRED: 'File required. Please attach file.',
  PUSH_OR_CAMPAIGN_ID_REQUIRED: 'No record found with given PushId or CampaignId.'
}
