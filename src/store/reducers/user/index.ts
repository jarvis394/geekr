import { FetchingState, UserExtended } from 'src/interfaces'
import { SET_TOKEN, GET_PROFILE } from './types'

const cachedToken = localStorage.getItem('token')

interface State {
  token: string
  profile: {
    state: FetchingState
    fetchError: string
    data: UserExtended
  }
}

const initialState: State = {
  token: cachedToken,
  profile: {
    state: FetchingState.Idle,
    fetchError: null,
    data: null,
  },
} as State

export default (reducerState = initialState, { type, payload }) => {
  switch (type) {
    case SET_TOKEN: {
      return {
        ...reducerState,
        token: payload,
      }
    }

    case GET_PROFILE: {
      return {
        ...reducerState,
        profile: {
          state: FetchingState.Fetching,
          fetchError: null,
          data: null,
        },
      }
    }

    case GET_PROFILE + '_FETCH_FULFILLED': {
      return {
        ...reducerState,
        profile: {
          state: FetchingState.Fetched,
          fetchError: null,
          data: payload,
        },
      }
    }

    case GET_PROFILE + '_FETCH_REJECTED': {
      return {
        ...reducerState,
        profile: {
          state: FetchingState.Error,
          fetchError: payload,
          data: null,
        },
      }
    }

    default:
      return reducerState
  }
}
