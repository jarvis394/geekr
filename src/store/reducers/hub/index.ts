import {
  FetchingState,
  HubAuthors,
  HubCompanies,
  HubExtended,
  Posts,
} from 'src/interfaces'
import getPostFirstImage from 'src/utils/getPostFirstImage'
import { GET_POSTS, typeCorrespondings } from './types'

interface FetchBaseInterface<T> {
  state: FetchingState
  fetchError: string
  data: T
}

interface State {
  profile: FetchBaseInterface<HubExtended>
  news: FetchBaseInterface<Posts>
  posts: FetchBaseInterface<Posts>
  authors: FetchBaseInterface<HubAuthors>
  companies: FetchBaseInterface<HubCompanies>
}

const defaultFetchData = {
  state: FetchingState.Idle,
  fetchError: null,
  data: null,
}

const initialState: State = {
  profile: defaultFetchData,
  news: defaultFetchData,
  posts: defaultFetchData,
  authors: defaultFetchData,
  companies: defaultFetchData,
}

export default (reducerState = initialState, { type, payload }): State => {
  const field = typeCorrespondings[type.split('_').slice(0, 3).join('_')]
  
  if (field) {
    if (type.endsWith('FETCH')) {
      return {
        ...reducerState,
        [field]: {
          state: FetchingState.Fetching,
          fetchError: null,
          data: null,
        },
      }
    } else if (type.endsWith('FETCH_FULFILLED')) {
      if (field === typeCorrespondings[GET_POSTS]) {
        for (const id in payload.articleRefs) {
          payload.articleRefs[id].postFirstImage = getPostFirstImage(
            payload.articleRefs[id]
          )
        }
      }

      return {
        ...reducerState,
        [field]: {
          state: FetchingState.Fetched,
          fetchError: null,
          data: payload,
        },
      }
    } else if (type.endsWith('FETCH_REJECTED')) {
      return {
        ...reducerState,
        [field]: {
          state: FetchingState.Error,
          fetchError: payload,
          data: null,
        },
      }
    }
  }

  return reducerState
}
