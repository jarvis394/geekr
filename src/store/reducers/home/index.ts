import {
  HOME_PREFIX,
  ADVERTS_PREFIX,
  SIDEBAR_TOP_COMPANIES,
  SIDEBAR_MOST_READING,
  SET_HOME_POST_ITEM_SIZE,
} from './types'
import { FLOWS, Mode, RATING_MODES } from 'src/config/constants'
import { Advert, FetchingState, FlowAlias, Posts } from 'src/interfaces'
import getCachedMode from 'src/utils/getCachedMode'
import getPostFirstImage from 'src/utils/getPostFirstImage'

interface ModeObject {
  pages: Record<number, Omit<Posts, 'pagesCount'>>
  pagesCount: number | null
  lastUpdated: number | null
}

const modes: Record<Mode, ModeObject> = {} as Record<Mode, ModeObject>
const flowModes = {} as Record<FlowAlias, Record<string, ModeObject>>
RATING_MODES.forEach(({ mode }) => {
  modes[mode] = {
    pages: {},
    pagesCount: null,
    lastUpdated: null,
  }
})
FLOWS.forEach((e) => {
  // TODO: fix types
  //@ts-expect-error
  flowModes[e.alias] = {}
  RATING_MODES.forEach(({ mode }) => {
    // TODO: fix types
    //@ts-expect-error
    flowModes[e.alias][mode] = {
      pages: {},
      pagesCount: null,
      lastUpdated: null,
    }
  })
})

const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  data: modes,
  sizesMap: {},
  flows: {
    fetching: false,
    fetched: false,
    error: null,
    data: flowModes,
  },
  adverts: {
    fetching: false,
    fetched: false,
    error: null,
    data: null as unknown as Advert[],
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
  // TODO: fix types
  //@ts-expect-error
  { type, payload }
): typeof initialState => {
  switch (type) {
    case HOME_PREFIX + 'FETCH': {
      if (payload.flow === 'all') {
        state.fetching = true
        state.fetched = false
        state.error = null
        state.mode = payload.mode
      } else {
        state.flows.fetching = true
        state.flows.fetched = false
        state.flows.error = null
      }
      return { ...state }
    }

    case HOME_PREFIX + 'FETCH_FULFILLED': {
      const { page, pagesCount, data, mode, flow } = payload as {
        page: number
        pagesCount: number
        data: Posts
        mode: Mode
        flow: FlowAlias
      }

      for (const id in data.publicationRefs) {
        data.publicationRefs[id].postFirstImage =
          getPostFirstImage(data.publicationRefs[id]) || undefined
      }

      if (flow === 'all') {
        state.data[mode].pages[page] = data
        state.data[mode].pagesCount = pagesCount
        state.data[mode].lastUpdated = Date.now()
        state.fetching = false
        state.fetched = true
        state.error = null
      } else {
        state.flows.data[flow][mode].pages[page] = data
        state.flows.data[flow][mode].pagesCount = pagesCount
        state.flows.data[flow][mode].lastUpdated = Date.now()
        state.flows.fetching = false
        state.flows.fetched = true
        state.flows.error = null
      }

      return { ...state }
    }

    case HOME_PREFIX + 'FETCH_REJECTED': {
      if (payload.flow === 'all') {
        return { ...state, fetching: false, fetched: false, error: payload }
      } else {
        return {
          ...state,
          flows: {
            ...state.flows,
            fetching: false,
            fetched: false,
            error: payload,
          },
        }
      }
    }

    case SET_HOME_POST_ITEM_SIZE: {
      // TODO: fix types
      //@ts-expect-error
      state.sizesMap[payload.id] = payload.size
      return { ...state }
    }

    case ADVERTS_PREFIX + 'FETCH': {
      state.adverts.fetched = false
      state.adverts.fetching = true
      state.adverts.error = null
      return { ...state }
    }

    case ADVERTS_PREFIX + 'FETCH_FULFILLED': {
      state.adverts.data = payload
      state.adverts.fetched = true
      state.adverts.fetching = false
      state.adverts.error = null
      return { ...state }
    }

    case ADVERTS_PREFIX + 'FETCH_REJECTED': {
      state.adverts.error = payload
      state.adverts.fetched = false
      state.adverts.fetching = false
      return { ...state }
    }

    case SIDEBAR_MOST_READING + 'FETCH': {
      state.sidebar.mostReading.data = null
      state.sidebar.mostReading.fetchError = null
      state.sidebar.mostReading.state = FetchingState.Fetching
      return { ...state }
    }

    case SIDEBAR_MOST_READING + 'FETCH_FULFILLED': {
      state.sidebar.mostReading.data = payload
      state.sidebar.mostReading.fetchError = null
      state.sidebar.mostReading.state = FetchingState.Fetched
      return { ...state }
    }

    case SIDEBAR_MOST_READING + 'FETCH_REJECTED': {
      state.sidebar.mostReading.data = null
      state.sidebar.mostReading.fetchError = payload
      state.sidebar.mostReading.state = FetchingState.Error
      return { ...state }
    }

    case SIDEBAR_TOP_COMPANIES + 'FETCH': {
      state.sidebar.topCompanies.data = null
      state.sidebar.topCompanies.fetchError = null
      state.sidebar.topCompanies.state = FetchingState.Fetching
      return { ...state }
    }

    case SIDEBAR_TOP_COMPANIES + 'FETCH_FULFILLED': {
      state.sidebar.topCompanies.data = payload
      state.sidebar.topCompanies.fetchError = null
      state.sidebar.topCompanies.state = FetchingState.Fetched
      return { ...state }
    }

    case SIDEBAR_TOP_COMPANIES + 'FETCH_REJECTED': {
      state.sidebar.topCompanies.data = null
      state.sidebar.topCompanies.fetchError = payload
      state.sidebar.topCompanies.state = FetchingState.Error
      return { ...state }
    }

    default:
      return state
  }
}
