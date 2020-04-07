import { HOME_PREFIX } from './types'

const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  data: {
    pages: {},
    pagesCount: null,
  },
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case `${HOME_PREFIX}_DAY_FETCH`: {
      const { page } = payload
      state.data.pages[page] = {}
      return { ...state, fetching: true, error: null, fetched: false }
    }

    case `${HOME_PREFIX}_DAY_FETCH_FULFILLED`: {
      const { page, pagesCount, data } = payload

      state.data.pages[page] = data
      state.data.pagesCount = pagesCount

      return { ...state, fetching: false, fetched: true, error: null }
    }

    case `${HOME_PREFIX}_DAY_FETCH_REJECTED`: {
      return { ...state, fetching: false, fetched: false, error: payload }
    }

    default:
      return state
  }
}
