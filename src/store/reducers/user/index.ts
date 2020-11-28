import { FetchingState, UserExtended } from 'src/interfaces'
import { GET_TOKEN, GET_PROFILE } from './types'

interface State {
  state: FetchingState
  fetchError: string
  token: string
  profile: {
    state: FetchingState
    fetchError: string
    data: UserExtended
  }
}

const initialState: State = {
  fetchError: null,
  state: FetchingState.Idle,
  token: null,
  profile: {
    state: FetchingState.Idle,
    fetchError: null,
    data: null,
  },
} as State

export default (reducerState = initialState, { type, payload }) => {
  switch (type) {
    case GET_TOKEN: {
      return {
        ...reducerState,
        state: FetchingState.Fetching,
        fetchError: null,
      }
    }

    case GET_TOKEN + '_FETCH_FULFILLED': {
      reducerState.token = payload
      return { ...reducerState, state: FetchingState.Fetched, fetchError: null }
    }

    case GET_TOKEN + '_FETCH_REJECTED': {
      return {
        ...reducerState,
        state: FetchingState.Error,
        fetchError: payload,
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
