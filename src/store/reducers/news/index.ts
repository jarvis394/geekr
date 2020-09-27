import { NEWS_PREFIX } from './types'

const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  block: {
    data: [],
    fetching: false,
    fetched: false,
    error: null,
    lastUpdated: null,
  },
  data: {
    pages: {},
    pagesCount: null,
  },
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case NEWS_PREFIX + 'FETCH': {
      return { ...state, fetching: true, error: null, fetched: false }
    }

    case NEWS_PREFIX + 'FETCH_FULFILLED': {
      const { page, pagesCount, data } = payload

      state.data.pages[page] = {
        articleIds: data.articleIds,
        articleRefs: data.articleRefs,
        lastUpdated: Date.now(),
      }
      state.data.pagesCount = pagesCount

      return { ...state, fetching: false, fetched: true, error: null }
    }

    case NEWS_PREFIX + 'FETCH_REJECTED': {
      return { ...state, fetching: false, fetched: false, error: payload }
    }

    case NEWS_PREFIX + 'PROMO_FETCH': {
      state.block.fetching = true
      state.block.fetched = false
      state.block.error = null
      return state
    }

    case NEWS_PREFIX + 'PROMO_FETCH_FULFILLED': {
      const { data } = payload
      state.block.fetching = false
      state.block.fetched = true
      state.block.error = null
      state.block.data = Object.values(data.articleRefs)
      state.block.lastUpdated = Date.now()

      return state
    }

    case NEWS_PREFIX + 'PROMO_FETCH_REJECTED': {
      state.block.fetching = false
      state.block.fetched = false
      state.block.error = payload
      return state
    }

    default:
      return state
  }
}
