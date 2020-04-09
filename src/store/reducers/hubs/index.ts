import { HUBS_PREFIX } from './types'

const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  data: {
    pages: {},
    pagesCount: null,
  },
  search: null,
  searchResults: [],
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case HUBS_PREFIX + 'FETCH': {
      return { ...state, fetching: true, fetched: false, error: null }
    }

    case HUBS_PREFIX + 'FETCH_FULFILLED': {
      const { page, data } = payload
      state.data.pagesCount = data.pages
      state.data.pages[page] = data.hubs
      return { ...state, fetching: false, fetched: true, error: null }
    }

    case HUBS_PREFIX + 'FETCH_REJECTED': {
      return { ...state, error: payload, fetching: false, fetched: false }
    }

    case HUBS_PREFIX + 'SEARCH_CLEAR': {
      return {
        ...state,
        searchResults: [],
        search: null,
      }
    }

    case HUBS_PREFIX + 'SEARCH_FETCH': {
      return {
        ...state,
        searchResults: [],
        fetching: true,
        fetched: false,
        error: null,
        search: payload.query,
      }
    }

    case HUBS_PREFIX + 'SEARCH_FETCH_FULFILLED': {
      const { data } = payload
      return {
        ...state,
        searchResults: data.hubs,
        fetching: false,
        fetched: true,
        error: null,
      }
    }

    case HUBS_PREFIX + 'SEARCH_FETCH_REJECTED': {
      return { ...state, error: payload, fetching: false, fetched: false }
    }

    default:
      return state
  }
}
