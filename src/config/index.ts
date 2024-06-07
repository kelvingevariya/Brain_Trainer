export default {
  AUTH: {
    HTTP_AUTH_USER: process.env.HTTP_AUTH_USER || 'squIre',
    HTTP_AUTH_PASSWORD: process.env.HTTP_AUTH_PASSWORD || 'squIre'
  },
  MODE: process.env.MODE || 'development',
  PORT: process.env.PORT && parseInt(process.env.PORT) || 3020,
  HOST: process.env.HOST || 'localhost',
  REDIS: {
    URL: process.env.REDIS_URL || '',
    VERIFICATION_EXPIRE: process.env.VERIFICATION_EXPIRE || 60 * 10, // 10 minutes
    VERIFICATION_EXPIRE_MANUAL: process.env.VERIFICATION_EXPIRE_MANUAL || 5, // 5 seconds
    SOCKET_KEY_PATTERN: (userId: number) => `socket:${userId}`,
    VERIFICATION_KEY_PATTERN: (userId: number) => `verification:${userId}`,
    SESSION_KEY_PATTERN: (sid: string) => `sess:${sid}`
  },
  DATABASE_URL: process.env.DATABASE_URL || '',
  DATABASE: {
    HOST: process.env.DATABASE_HOST || '',
    USERNAME: process.env.DATABASE_USERNAME || '',
    PASSWORD: process.env.DATABASE_PASSWORD || '',
    SCHEMA: process.env.DATABASE_SCHEMA || ''
  },
  VALIDATIONS: {
    DEFAULT_OPTIONS: {
      abortEarly: true,
      allowUnknown: false,
      convert: true
    },
    DB_MAX_INTEGER_VALUE: 21474836,
    DB_MAX_STRING_VALUE: 250,
    DB_MAX_TEXT_VALUE: 400,
    UBER_REQUEST_PRODUCT_ID: 36,
    SUPPORT_STATUSES: ['waiting', 'ongoing', 'completed', 'canceled'],
    SUPPORT_TYPES: ['call', 'email', 'chat']
  },
  SERVICES: {
    STRIPE: 'Stripe',
    REDIS: 'Redis',
    ZENDESK: 'Zendesk',
    SEQUELIZE: 'Sequelize'
  },
  SESSION: {
    MAX_AGE: 1000 * 60 * 60 * 24 * 90 * 4 * 3, // approx 3 years
    SECRET: process.env.SESSION_SECRET || 'secret'
  },
  USER_STATUSES: {
    NEGATIVE: ['inactive', 'paused']
  },
  RETRY_AFTER_HEADER: process.env.RETRY_AFTER_HEADER || 2 * 60 * 60,
  SENDGRID: {
    REENGAGEMENT_EMAIL_TEMPLATE_ID: process.env.SENDGRID_REENGAGEMENT_EMAIL_TEMPLATE_ID || '',
    WELCOME_EMAIL_TEMPLATE_ID: process.env.SENDGRID_WELCOME_EMAIL_TEMPLATE_ID || '',
    CONFIRMATION_ZOOM_TEMPLATE_ID: process.env.SENDGRID_CONFIRMATION_ZOOM_TEMPLATE_ID || '',
    CONFIRMATION_CALL_ZOOM_TEMPLATE_ID: process.env.SENDGRID_CONFIRMATION_CALL_ZOOM_TEMPLATE_ID || '',
    REMINDER_CALL_ZOOM_TEMPLATE_ID: process.env.SENDGRID_REMINDER_CALL_ZOOM_TEMPLATE_ID || '',
    REMINDER_ZOOM_TEMPLATE_ID: process.env.SENDGRID_REMINDER_ZOOM_TEMPLATE_ID || '',
    CONFIRMATION_TEMPLATE_ID: process.env.SENDGRID_CONFIRMATION_TEMPLATE_ID || '',
    REMINDER_TEMPLATE_ID: process.env.SENDGRID_REMINDER_TEMPLATE_ID || '',
    TECH_EXPERT_RECEIPT_TEMPLATE: process.env.SENDGRID_TECH_EXPERT_RECEIPT_TEMPLATE || '',
    EMAIL_VERIFICATION_TEMPLATE: process.env.SENDGRID_EMAIL_VERIFICATION_TEMPLATE_ID || '',
    LOGIN_EMAIL_VERIFICATION_TEMPLATE: process.env.SENDGRID_LOGIN_EMAIL_VERIFICATION_TEMPLATE_ID || '',
    SENDGRID_KEY: process.env.SENDGRID_KEY || '',
    DAILY_DIGEST_UNSUBSCRIBE_GROUP_ID: process.env.DAILY_DIGEST_UNSUBSCRIBE_GROUP_ID || '',
    FROM_NAME: process.env.SENDGRID_FROM_NAME || '',
    FROM_EMAIL: process.env.SENDGRID_FROM_EMAIL || '',
    SENDGRID_WEBHOOK_VERIFICATION_PUBLIC_KEY: process.env.SENDGRID_WEBHOOK_VERIFICATION_PUBLIC_KEY || ''
  },
  FIREBASE: {
    API_KEY: process.env.FIREBASE_API_KEY || '',
    PROJECT_ID: 'go-squire',
    DOMAIN_URI_PREFIX: 'https://squire.page.link',
    ANDROID_PACKAGE_NAME: 'com.gosquire',
    IOS_BUNDLE_NAME: 'com.gosquire',
    IOS_APPLE_ID: '1621031897',
    SOCIAL_METADATA_TITLE: 'Stay inspired and entertained',
    SOCIAL_METADATA_DESC: 'Unlimited videos, magazine articles, games, and more, selected for you from reputable sources only',
    SOCIAL_METADATA_IMAGE: 'https://squire-static-files.s3.amazonaws.com/backend/firebase/banner.jpg',
    HOST: process.env.FIREBASE_DYNAMIC_LINK_HOST || '',
    PATH: (userId: number, verificationId: string) => `/api/v1/users/${userId}/verify/${verificationId}`
  },
  VERIFICATION_HOST: process.env.VERIFICATION_HOST || 'http://verify.gosquire.xyz',
  TWILIO: {
    ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || '',
    TOKEN: process.env.TWILIO_TOKEN || '',
    FROM: process.env.TWILIO_FROM || '',
    SERVICE_ID: process.env.TWILLIO_SERVICE_ID || '',
    URL: 'https://verify.twilio.com/v2/Services'
  },
  MODULES: {
    TAXI: 'taxi',
    FLOWER: 'flower',
    TECH_EXPERT: 'tech-expert'
  }
}
