import { FetchingState } from 'src/interfaces'
import { GET_TOKEN } from './types'

interface State {
  state: FetchingState
  fetchError: string
  token: string
}

const initialState: State = {
  fetchError: null,
  state: FetchingState.Idle,
  token: null,
}

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

    default:
      return reducerState
  }
}
