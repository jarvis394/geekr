import { AUTH_DATA_KEY, CSRF_TOKEN_KEY } from 'src/config/constants'
import { FetchingState } from 'src/interfaces'
import AuthData from 'src/interfaces/AuthData'
import safeJSONParse from 'src/utils/safeJSONParse'
import {
  GET_AUTH_DATA,
  GET_CSRF_TOKEN,
  GET_ME,
  State,
  USER_LOGOUT,
} from './types'

const cachedAuthData = safeJSONParse<AuthData, null>(
  localStorage.getItem(AUTH_DATA_KEY),
  null
)
const cachedCSRFToken = localStorage.getItem(CSRF_TOKEN_KEY)
const initialState: State = {
  authData: {
    data: null, // cachedAuthData,
    state: FetchingState.Idle, // FetchingState[cachedAuthData ? 'Fetched' : 'Idle'],
    fetchError: null,
  },
  csrfToken: {
    data: null, // cachedCSRFToken,
    state: FetchingState.Idle, // FetchingState[cachedCSRFToken ? 'Fetched' : 'Idle'],
    fetchError: null,
  },
  me: {
    state: FetchingState.Idle,
    fetchError: null,
    data: null,
  },
  authorizedRequestData: null,
  // cachedAuthData && cachedCSRFToken ? {
  //   connectSID: cachedAuthData?.connectSID,
  //   csrfToken: cachedCSRFToken,
  // }
  // : null,
}

export default (reducerState = initialState, { type, payload }): State => {
  switch (type) {
    case GET_AUTH_DATA + '_FETCH': {
      reducerState.authData.state = FetchingState.Fetching
      reducerState.authData.fetchError = null
      reducerState.authData.data = null
      return reducerState
    }

    case GET_AUTH_DATA + '_FETCH_FULFILLED': {
      reducerState.authData.state = FetchingState.Fetched
      reducerState.authData.fetchError = null
      reducerState.authData.data = payload
      reducerState.authorizedRequestData = {
        ...reducerState.authorizedRequestData,
        connectSID: payload.connectSID,
      }
      localStorage.setItem(AUTH_DATA_KEY, JSON.stringify(payload))
      return reducerState
    }

    case GET_AUTH_DATA + '_FETCH_REJECTED': {
      reducerState.authData.state = FetchingState.Error
      reducerState.authData.fetchError = payload
      reducerState.authData.data = null
      return reducerState
    }

    case GET_CSRF_TOKEN + '_FETCH': {
      reducerState.csrfToken.state = FetchingState.Fetching
      reducerState.csrfToken.fetchError = null
      reducerState.csrfToken.data = null
      return reducerState
    }

    case GET_CSRF_TOKEN + '_FETCH_FULFILLED': {
      reducerState.csrfToken.state = FetchingState.Fetched
      reducerState.csrfToken.fetchError = null
      reducerState.csrfToken.data = payload
      reducerState.authorizedRequestData = {
        ...reducerState.authorizedRequestData,
        csrfToken: payload,
      }
      localStorage.setItem(CSRF_TOKEN_KEY, payload)
      return reducerState
    }

    case GET_CSRF_TOKEN + '_FETCH_REJECTED': {
      reducerState.csrfToken.state = FetchingState.Error
      reducerState.csrfToken.fetchError = payload
      reducerState.csrfToken.data = null
      return reducerState
    }

    case GET_ME + '_FETCH': {
      return {
        ...reducerState,
        me: {
          state: FetchingState.Fetching,
          fetchError: null,
          data: null,
        },
      }
    }

    case GET_ME + '_FETCH_FULFILLED': {
      if (!payload) {
        reducerState.authData.data = null
        reducerState.authData.state = FetchingState.Idle
        reducerState.authData.fetchError = null
        reducerState.csrfToken.data = null
        reducerState.csrfToken.state = FetchingState.Idle
        reducerState.csrfToken.fetchError = null
        reducerState.authorizedRequestData = null
        localStorage.removeItem(AUTH_DATA_KEY)
        localStorage.removeItem(CSRF_TOKEN_KEY)

        return {
          ...reducerState,
          me: {
            state: FetchingState.Error,
            fetchError: 'Expired authData',
            data: null,
          },
        }
      }
      return {
        ...reducerState,
        me: {
          state: FetchingState.Fetched,
          fetchError: null,
          data: payload,
        },
      }
    }

    case GET_ME + '_FETCH_REJECTED': {
      return {
        ...reducerState,
        me: {
          state: FetchingState.Error,
          fetchError: payload,
          data: null,
        },
      }
    }

    case USER_LOGOUT: {
      localStorage.removeItem(AUTH_DATA_KEY)
      localStorage.removeItem(CSRF_TOKEN_KEY)
      return {
        authData: {
          data: null,
          state: FetchingState.Idle,
          fetchError: null,
        },
        csrfToken: {
          data: null,
          state: FetchingState.Idle,
          fetchError: null,
        },
        me: initialState.me,
        authorizedRequestData: null,
      }
    }

    default:
      return reducerState
  }
}
