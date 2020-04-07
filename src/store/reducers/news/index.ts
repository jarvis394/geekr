import { NEWS_PREFIX } from './types'

const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  data: {
    block: [],
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
        lastUpdate: Date.now(),
      }
      state.data.pagesCount = pagesCount

      return { ...state, fetching: false, fetched: true, error: null }
    }

    case NEWS_PREFIX + 'FETCH_REJECTED': {
      return { ...state, fetching: false, fetched: false, error: payload }
    }

    case NEWS_PREFIX + 'PROMO_FETCH': {
      return { ...state, fetching: true, error: null, fetched: false }
    }

    case NEWS_PREFIX + 'PROMO_FETCH_FULFILLED': {
      const { data } = payload
      state.data.block = data

      return { ...state, fetching: false, fetched: true, error: null }
    }

    case NEWS_PREFIX + 'PROMO_FETCH_REJECTED': {
      return { ...state, fetching: false, fetched: false, error: payload }
    }

    default:
      return state
  }
}
