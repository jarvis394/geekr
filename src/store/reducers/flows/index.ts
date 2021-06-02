import {
  HOME_PREFIX,
  ADVERTS_PREFIX,
  SIDEBAR_TOP_COMPANIES,
  SIDEBAR_MOST_READING,
} from './types'
import { RATING_MODES } from 'src/config/constants'
import { Advert, FetchingState, Posts } from 'src/interfaces'
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
  sidebar: {
    mostReading: {
      state: FetchingState.Idle,
      fetchError: null,
      data: null,
    },
    topCompanies: {
      state: FetchingState.Idle,
      fetchError: null,
      data: null,
    },
  },
  mode: getCachedMode().mode,
}

export default (
  state = initialState,
  { type, payload }
): typeof initialState => {
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

    case SIDEBAR_MOST_READING + 'FETCH': {
      state.sidebar.mostReading.data = null
      state.sidebar.mostReading.fetchError = null
      state.sidebar.mostReading.state = FetchingState.Fetching
      return state
    }

    case SIDEBAR_MOST_READING + 'FETCH_FULFILLED': {
      state.sidebar.mostReading.data = payload
      state.sidebar.mostReading.fetchError = null
      state.sidebar.mostReading.state = FetchingState.Fetched
      return state
    }

    case SIDEBAR_MOST_READING + 'FETCH_REJECTED': {
      state.sidebar.mostReading.data = null
      state.sidebar.mostReading.fetchError = payload
      state.sidebar.mostReading.state = FetchingState.Error
      return state
    }

    case SIDEBAR_TOP_COMPANIES + 'FETCH': {
      state.sidebar.topCompanies.data = null
      state.sidebar.topCompanies.fetchError = null
      state.sidebar.topCompanies.state = FetchingState.Fetching
      return state
    }

    case SIDEBAR_TOP_COMPANIES + 'FETCH_FULFILLED': {
      state.sidebar.topCompanies.data = payload
      state.sidebar.topCompanies.fetchError = null
      state.sidebar.topCompanies.state = FetchingState.Fetched
      return state
    }

    case SIDEBAR_TOP_COMPANIES + 'FETCH_REJECTED': {
      state.sidebar.topCompanies.data = null
      state.sidebar.topCompanies.fetchError = payload
      state.sidebar.topCompanies.state = FetchingState.Error
      return state
    }

    default:
      return state
  }
}
