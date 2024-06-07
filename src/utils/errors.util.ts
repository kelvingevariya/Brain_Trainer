interface CustomErrors {
    'CoodrinatesError': ErrorConstructor
    'DatabaseQueryError': ErrorConstructor
    'DynamicLinkError': ErrorConstructor
    'FareEstimateExpiredError': ErrorConstructor
    'HighFareError': ErrorConstructor
    'InputValidationError': ErrorConstructor
    'EmailExistError': ErrorConstructor
    'NoPermissionError': ErrorConstructor
    'PathNotFoundError': ErrorConstructor
    'PaymentError': ErrorConstructor
    'ProcessEnvVariableError': ErrorConstructor
    'ResourceNotFoundError': ErrorConstructor
    'SMSProviderError': ErrorConstructor
    'PhoneLookupError': ErrorConstructor
    'VerificationServiceError': ErrorConstructor
    'ZoomError': ErrorConstructor
    'S3Error': ErrorConstructor
    'SequelizeDatabaseSyncError': ErrorConstructor
    'StripeSignatureNotFound': ErrorConstructor
    'UnauthorizedError': ErrorConstructor
    'UserNotFoundError': ErrorConstructor
    'SettingNotFoundError': ErrorConstructor
    'TaxiProviderError': ErrorConstructor
    'InvalidVerificationLinkError': ErrorConstructor
    'QueueError': ErrorConstructor
    'DuplicatePhoneError': ErrorConstructor
    'FileNotFound': ErrorConstructor
    'FolderNotFound': ErrorConstructor
    'TaskNotFound': ErrorConstructor
    'FileRequired': ErrorConstructor
  }

const CUSTOM_ERRORS = [
  'CoodrinatesError',
  'DatabaseQueryError',
  'DynamicLinkError',
  'FareEstimateExpiredError',
  'HighFareError',
  'InputValidationError',
  'EmailExistError',
  'NoPermissionError',
  'PathNotFoundError',
  'PaymentError',
  'ProcessEnvVariableError',
  'ResourceNotFoundError',
  'SMSProviderError',
  'PhoneLookupError',
  'VerificationServiceError',
  'ZoomError',
  'S3Error',
  'SequelizeDatabaseSyncError',
  'StripeSignatureNotFound',
  'UnauthorizedError',
  'UserNotFoundError',
  'SettingNotFoundError',
  'TaxiProviderError',
  'InvalidVerificationLinkError',
  'QueueError',
  'DuplicatePhoneError',
  'FileNotFound',
  'FolderNotFound',
  'TaskNotFound',
  'FileRequired'
]

export const ERRORS = CUSTOM_ERRORS.reduce((acc, className) => {
  acc = {
    ...acc,
    [className]: class extends Error {
      constructor (message: string) {
        super(message)
        this.name = this.constructor.name
      }
    }
  }

  return acc
}, {}) as CustomErrors
