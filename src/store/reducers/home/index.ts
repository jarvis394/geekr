import { HOME_PREFIX, ADVERTS_PREFIX } from './types'
import { RATING_MODES } from 'src/config/constants'
import { Advert, Posts } from 'src/interfaces'
import getCachedMode from 'src/utils/getCachedMode'
import getPostFirstImage from 'src/utils/getPostFirstImage'

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
  adverts: {
    fetching: false,
    fetched: false,
    error: null,
    data: null as Advert[],
  },
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

      for (const id in data.articleRefs) {
        data.articleRefs[id].postFirstImage = getPostFirstImage(
          data.articleRefs[id]
        )
      }

      state.data[mode].pages[page] = data
      state.data[mode].pagesCount = pagesCount
      state.data[mode].lastUpdated = Date.now()

      return { ...state, fetching: false, fetched: true, error: null }
    }

    case HOME_PREFIX + 'FETCH_REJECTED': {
      return { ...state, fetching: false, fetched: false, error: payload }
    }

    case ADVERTS_PREFIX + 'FETCH': {
      state.adverts.fetched = false
      state.adverts.fetching = true
      state.adverts.error = null
      return state
    }

    case ADVERTS_PREFIX + 'FETCH_FULFILLED': {
      state.adverts.data = payload
      state.adverts.fetched = true
      state.adverts.fetching = false
      state.adverts.error = null
      return state
    }

    case ADVERTS_PREFIX + 'FETCH_REJECTED': {
      state.adverts.error = payload
      state.adverts.fetched = false
      state.adverts.fetching = false
      return state
    }

    default:
      return state
  }
}
