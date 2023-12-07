import { PROFILE_ARTICLES } from './types'
import getPostFirstImage from 'src/utils/getPostFirstImage'

const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  data: {
    pages: {},
    pagesCount: null,
    lastUpdated: null,
  },
}

// TODO: fix types
//@ts-expect-error
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case PROFILE_ARTICLES + 'FETCH': {
      return { ...state, fetching: true, error: null, fetched: false }
    }

    case PROFILE_ARTICLES + 'FETCH_FULFILLED': {
      const { page, pagesCount, data } = payload

      for (const id in data.publicationRefs) {
        data.publicationRefs[id].postFirstImage = getPostFirstImage(
          data.publicationRefs[id]
        )
      }

      // TODO: fix types
      //@ts-expect-error
      state.data.pages[page] = {
        publicationIds: data.publicationIds,
        publicationRefs: data.publicationRefs,
        lastUpdated: Date.now(),
      }
      state.data.pagesCount = pagesCount

      return { ...state, fetching: false, fetched: true, error: null }
    }

    case PROFILE_ARTICLES + 'FETCH_REJECTED': {
      return { ...state, fetching: false, fetched: false, error: payload }
    }

    default:
      return state
  }
}
