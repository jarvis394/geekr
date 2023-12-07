import { NEWS_PREFIX } from './types'
import getPostFirstImage from 'src/utils/getPostFirstImage'
import { FLOWS } from 'src/config/constants'

const flowsData: Record<
  string,
  {
    // TODO: fix types
    pages: any
    pagesCount: null
  }
> = {}
FLOWS.forEach((e) => {
  flowsData[e.alias] = {
    pages: {},
    pagesCount: null,
  }
})

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
  flows: flowsData,
  data: {
    pages: {},
    pagesCount: null,
  },
}

// TODO: fix types
//@ts-expect-error
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case NEWS_PREFIX + 'FETCH': {
      return { ...state, fetching: true, error: null, fetched: false }
    }

    case NEWS_PREFIX + 'FETCH_FULFILLED': {
      const { page, pagesCount, data, flow } = payload
      const ids = flow === 'all' ? data.publicationIds : data.newsIds
      const refs = flow === 'all' ? data.publicationRefs : data.newsRefs

      for (const id in refs) {
        refs[id].postFirstImage = getPostFirstImage(refs[id])
      }

      if (flow === 'all') {
        // TODO: fix types
        //@ts-expect-error
        state.data.pages[page] = {
          publicationIds: ids,
          publicationRefs: refs,
          lastUpdated: Date.now(),
        }
        state.data.pagesCount = pagesCount
      } else {
        state.flows[flow].pages[page] = {
          publicationIds: ids,
          publicationRefs: refs,
          lastUpdated: Date.now(),
        }
        state.flows[flow].pagesCount = pagesCount
      }

      return { ...state, fetching: false, fetched: true, error: null }
    }

    case NEWS_PREFIX + 'FETCH_REJECTED': {
      return { ...state, fetching: false, fetched: false, error: payload }
    }

    case NEWS_PREFIX + 'PROMO_FETCH': {
      state.block.fetching = true
      state.block.fetched = false
      state.block.error = null
      return { ...state }
    }

    case NEWS_PREFIX + 'PROMO_FETCH_FULFILLED': {
      const { data } = payload
      state.block.fetching = false
      state.block.fetched = true
      state.block.error = null
      state.block.data = Object.values(data.articleRefs)
      // TODO: fix types
      //@ts-expect-error
      state.block.lastUpdated = Date.now()

      return { ...state }
    }

    case NEWS_PREFIX + 'PROMO_FETCH_REJECTED': {
      state.block.fetching = false
      state.block.fetched = false
      state.block.error = payload
      return { ...state }
    }

    default:
      return state
  }
}
