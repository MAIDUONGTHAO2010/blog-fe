// HTTP
export const HTTP_STATUS_CODE = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  UNPROCESSABLE_ENTITY: 422,
}
export const FETCH_ERROR_NAME = 'FetchError'

// Cookies
export const COOKIE_MAX_AGE_IN_SECS = 34560000 // 400 * 24 * 60 * 60 (seconds) (Limit 400 days)

// Inactivity threshold
export const INACTIVITY_THRESHOLD = 2 * 60 * 60 * 1000 // 2 hours
export const UPDATE_LAST_ACTIVE_TIME_PERIOD = 1 * 60 * 1000 // 1 minute
export const LAST_ACTIVE_TIME_KEY = 'last_active_time'
export const DOWNLOAD_TIMEOUT = 600 // 10 minutes

// Pagination
export const DEFAULT_PAGE_SIZE = 6
export const DEFAULT_PAGE = 1

// Length
export const COMPANY_NAME_MAX_LENGTH = 255
export const SHOP_NAME_MAX_LENGTH = 255
export const LOGIN_ID_MAX_LENGTH = 255
export const PASSWORD_MIN_LENGTH = 12
export const PASSWORD_MAX_LENGTH = 50
export const LICENSE_MAX_LENGTH = 3
export const DEVICE_MAX_LENGTH = 20
export const FILE_NAME_MAX_LENGTH = 255

// Message
export const MESSAGE_DURATION = 3 // seconds
export const MESSAGE_MAX_COUNT = 1

export const DEBOUNCE_SEARCH_DELAY_MS = 300 // 300ms

export const INPUT_TYPE = {
  INPUT: 'input',
  TEXTAREA: 'textarea',
}

export const INPUT_ERROR_TYPE = {
  WARNING: 'warning',
  ERROR: 'error',
}
