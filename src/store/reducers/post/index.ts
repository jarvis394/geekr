import {
  COMMENTS_FETCH,
  COMMENTS_FETCH_FULFILLED,
  COMMENTS_FETCH_REJECTED,
  COMPANY_FETCH,
  COMPANY_FETCH_FULFILLED,
  COMPANY_FETCH_REJECTED,
  POST_FETCH,
  POST_FETCH_FULFILLED,
  POST_FETCH_REJECTED,
  SET_POST_READING_PROGRESS,
  State,
} from './types'
import { POST_READING_PROGRESS_KEY } from 'src/config/constants'
import { FetchingState } from 'src/interfaces'
import safeJSONParse from 'src/utils/safeJSONParse'

const initialData = {
  data: null,
  state: FetchingState.Idle,
  fetchError: null,
}

const lastPostInitialData = {
  data: null,
  offset: null,
  progress: null,
}
const lastPostData: State['lastPost'] =
  safeJSONParse(
    localStorage.getItem(POST_READING_PROGRESS_KEY),
    lastPostInitialData
  ) || lastPostInitialData

const initialState: State = {
  post: initialData,
  comments: initialData,
  company: initialData,
  lastPost: lastPostData,
}

export default (storeState = initialState, { type, payload }): State => {
  switch (type) {
    /** New post is being fetched, so we need to reset `comments` and `company` data */
    case POST_FETCH:
      return {
        ...storeState,
        post: {
          state: FetchingState.Fetching,
          fetchError: null,
          data: null,
        },
        company: initialData,
        comments: initialData,
      }

    case POST_FETCH_FULFILLED:
      return {
        ...storeState,
        post: {
          state: FetchingState.Fetched,
          fetchError: null,
          data: payload,
        },
      }

    /**
     * When post is rejected we want to reset `comments` value
     * because comments page uses post data
     * */
    case POST_FETCH_REJECTED:
      return {
        ...storeState,
        post: {
          state: FetchingState.Error,
          fetchError: payload,
          data: null,
        },
        comments: initialData,
      }

    /** Do not reset post data on comments fetch */
    case COMMENTS_FETCH:
      return {
        ...storeState,
        comments: {
          state: FetchingState.Fetching,
          fetchError: null,
          data: null,
        },
      }

    case COMMENTS_FETCH_FULFILLED:
      return {
        ...storeState,
        comments: {
          state: FetchingState.Fetched,
          fetchError: null,
          data: payload,
        },
      }

    /**
     * If comments fetch request was rejected, we don't want to
     * reset the `post` data
     */
    case COMMENTS_FETCH_REJECTED:
      return {
        ...storeState,
        comments: {
          state: FetchingState.Error,
          fetchError: payload,
          data: null,
        },
      }

    case COMPANY_FETCH:
      return {
        ...storeState,
        company: {
          state: FetchingState.Fetching,
          fetchError: null,
          data: null,
        },
      }

    case COMPANY_FETCH_FULFILLED:
      return {
        ...storeState,
        company: {
          state: FetchingState.Fetched,
          fetchError: null,
          data: payload,
        },
      }

    case COMPANY_FETCH_REJECTED:
      return {
        ...storeState,
        company: {
          state: FetchingState.Error,
          fetchError: payload,
          data: null,
        },
      }

    case SET_POST_READING_PROGRESS: {
      const data = {
        progress: payload.progress,
        data: payload.post,
        offset: payload.offset,
      }
      localStorage.setItem(POST_READING_PROGRESS_KEY, JSON.stringify(data))
      return {
        ...storeState,
        lastPost: data,
      }
    }

    default:
      return storeState
  }
}
