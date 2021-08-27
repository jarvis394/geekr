import { AuthorizedRequestParams, FetchingState, Me } from 'src/interfaces'
import AuthData from 'src/interfaces/AuthData'

export const AUTH_PREFIX = 'AUTH_'
export const GET_AUTH_DATA = AUTH_PREFIX + 'GET_AUTH_DATA'
export const GET_CSRF_TOKEN = AUTH_PREFIX + 'GET_CSRF_TOKEN'
export const GET_ME = AUTH_PREFIX + 'GET_ME'
export const USER_LOGOUT = 'USER_LOGOUT'

export interface State {
  authData: {
    data: AuthData | null
    state: FetchingState
    fetchError: {
      isAuthError?: boolean
      isCaptchaError?: boolean
      isUnknownAuthError?: boolean
      error?: boolean
      message?: string
    } | null
  }
  csrfToken: {
    data: string
    state: FetchingState
    fetchError: string
  }
  me: {
    state: FetchingState
    fetchError: string
    data: Me
  }
  authorizedRequestData: AuthorizedRequestParams | null
}
