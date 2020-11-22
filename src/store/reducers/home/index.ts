import { HOME_PREFIX } from './types'
import { RATING_MODES } from 'src/config/constants'
import { Posts } from 'src/interfaces'
import getCachedMode from 'src/utils/getCachedMode'

interface ModeObject {
  pages: Record<number, Omit<Posts, 'pagesCount'>>
  pagesCount: number
  lastUpdated: number
}

const modes: Record<string, ModeObject> = {}
RATING_MODES.forEach(({ mode }) => {
  modes[mode] = {
    pages: {},
    pagesCount: null,
    lastUpdated: null,
  }
})

const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  data: modes,
  mode: getCachedMode().mode,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case HOME_PREFIX + 'FETCH': {
      return {
        ...state,
        fetching: true,
        error: null,
        fetched: false,
        mode: payload,
      }
    }

    case HOME_PREFIX + 'FETCH_FULFILLED': {
      const { page, pagesCount, data, mode } = payload

      state.data[mode].pages[page] = data
      state.data[mode].pagesCount = pagesCount
      state.data[mode].lastUpdated = Date.now()

      return { ...state, fetching: false, fetched: true, error: null }
    }

    case HOME_PREFIX + 'FETCH_REJECTED': {
      return { ...state, fetching: false, fetched: false, error: payload }
    }

    default:
      return state
  }
}
