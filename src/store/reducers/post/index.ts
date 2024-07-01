import {
  COMMENTS_FETCH,
  COMMENTS_FETCH_FULFILLED,
  COMMENTS_FETCH_REJECTED,
  COMPANY_FETCH,
  COMPANY_FETCH_FULFILLED,
  COMPANY_FETCH_REJECTED,
  POST_DOWNVOTE_REASONS_FETCH,
  POST_DOWNVOTE_REASONS_FETCH_FULFILLED,
  POST_DOWNVOTE_REASONS_FETCH_REJECTED,
  POST_FETCH,
  POST_FETCH_FULFILLED,
  POST_FETCH_REJECTED,
  SET_POST_COMMENT_SIZE,
  State,
} from './types'
import { DownvoteReasons, FetchingState } from 'src/interfaces'

const initialData = {
  data: null,
  state: FetchingState.Idle,
  fetchError: null,
}
const initialCommentsData = {
  fetchedData: null,
  comments: null,
  state: FetchingState.Idle,
  fetchError: null,
  sizesMap: {},
  parseOptions: {},
}

const initialState: State = {
  post: initialData,
  comments: initialCommentsData,
  company: initialData,
  downvoteReasons: initialData,
}

// TODO: fix types
//@ts-expect-error temporary fix
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
        comments: initialCommentsData,
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
        comments: initialCommentsData,
      }

    case SET_POST_COMMENT_SIZE: {
      storeState.comments.sizesMap[payload.id] = payload.size
      return storeState
    }

    /** Do not reset post data on comments fetch */
    case COMMENTS_FETCH:
      return {
        ...storeState,
        comments: {
          ...initialCommentsData,
          state: FetchingState.Fetching,
        },
      }

    case COMMENTS_FETCH_FULFILLED:
      return {
        ...storeState,
        comments: {
          state: FetchingState.Fetched,
          fetchError: null,
          fetchedData: payload.fetchedData,
          comments: payload.comments,
          sizesMap: {},
          parseOptions: payload.parseOptions,
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
          fetchedData: null,
          comments: null,
          sizesMap: {},
          parseOptions: {},
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

    case POST_DOWNVOTE_REASONS_FETCH:
      return {
        ...storeState,
        downvoteReasons: {
          ...initialData,
          state: FetchingState.Fetching,
        },
      }

    case POST_DOWNVOTE_REASONS_FETCH_FULFILLED:
      return {
        ...storeState,
        downvoteReasons: {
          state: FetchingState.Fetched,
          fetchError: null,
          data: Object.values((payload as DownvoteReasons).data).sort(
            (a, b) => a.order - b.order
          ),
        },
      }

    case POST_DOWNVOTE_REASONS_FETCH_REJECTED:
      return {
        ...storeState,
        downvoteReasons: {
          state: FetchingState.Error,
          fetchError: payload,
          data: initialData.data,
        },
      }

    default:
      return storeState
  }
}
