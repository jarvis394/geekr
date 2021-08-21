import * as api from 'src/api'
import apiGetCompany from 'src/api/getCompany'
import { THREAD_LEVEL } from 'src/config/constants'
import { FetchingState, Comment as IComment } from 'src/interfaces'
import { RootState } from '..'
import {
  COMMENTS_FETCH,
  COMMENTS_FETCH_FULFILLED,
  COMMENTS_FETCH_REJECTED,
  POST_FETCH,
  POST_FETCH_FULFILLED,
  POST_FETCH_REJECTED,
  COMPANY_FETCH,
  COMPANY_FETCH_FULFILLED,
  COMPANY_FETCH_REJECTED,
  SET_POST_COMMENT_SIZE,
  POST_DOWNVOTE_REASONS_FETCH,
  POST_DOWNVOTE_REASONS_FETCH_FULFILLED,
  POST_DOWNVOTE_REASONS_FETCH_REJECTED,
  GetPostCommentsOptions,
} from '../reducers/post/types'

const parseComments = (
  nodes: Map<number, IComment>,
  options?: Partial<GetPostCommentsOptions>
) => {
  const root: IComment[] = []
  for (const id in nodes) {
    const comment = nodes[id]
    comment.children = []

    const parent = comment.parentId !== 0 ? nodes[comment.parentId] : null

    if (!parent) {
      root.push(comment)
    } else {
      parent.children.push(comment)
    }
  }

  if (options?.sortByKarma) root.sort((a, b) => b.score - a.score)

  return root
}

const flatten = (nodes, a = []) => {
  nodes.forEach((e) => {
    a.push(e)
    flatten(e.children, a)
  })
  return a
}

const setLevelInfo = (nodes: IComment[]) => {
  nodes.forEach((_, i) => {
    const nextNode = nodes[Math.min(i + 1, nodes.length - 1)]
    const prevNode = nodes[Math.max(i - 1, 0)]
    const currentNode = nodes[i]
    const threadLevel = Math.trunc(currentNode.level / THREAD_LEVEL)
    const nextThreadLevel = Math.trunc(nextNode.level / THREAD_LEVEL)
    nodes[i].threadLevel = threadLevel
    nodes[i].isThreadStart = nextThreadLevel > threadLevel
    nodes[i].isLastInThread = nextNode.level === 0 && !!nextNode.author
    nodes[i].isNewLevel = prevNode.level < currentNode.level
  })
  return nodes
}

/**
 * Gets post data and dispatches it to the `post` store
 * @param id Post ID
 */
export const getPost = (id: number | string) => async (
  dispatch,
  getState: () => RootState
) => {
  const storeData = getState().post.post
  const authorizedRequestData = getState().auth.authorizedRequestData
  if (
    storeData.state === FetchingState.Fetched &&
    storeData.data.id.toString() === id.toString()
  ) {
    return Promise.resolve()
  }

  dispatch({ type: POST_FETCH })

  try {
    const data = await api.getPost(id, authorizedRequestData)
    dispatch({
      type: POST_FETCH_FULFILLED,
      payload: data,
    })
  } catch (error) {
    dispatch({ type: POST_FETCH_REJECTED, payload: error?.message })
  }
}

/**
 * Gets post downvote reasons
 */
export const getDownvoteReasons = () => async (
  dispatch,
  getState: () => RootState
) => {
  const storeData = getState().post.downvoteReasons
  if (storeData.state === FetchingState.Fetched) {
    return Promise.resolve()
  }

  dispatch({ type: POST_DOWNVOTE_REASONS_FETCH })

  try {
    const data = await api.getDownvoteReasons()
    dispatch({
      type: POST_DOWNVOTE_REASONS_FETCH_FULFILLED,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: POST_DOWNVOTE_REASONS_FETCH_REJECTED,
      payload: error?.message,
    })
  }
}

/**
 * Parse existing comments
 * @param id Post ID
 */
export const parsePostComments = (
  id: number | string,
  options: Partial<GetPostCommentsOptions> = {}
) => async (dispatch, getState: () => RootState) => {
  const state = getState()
  const storeData = state.post

  if (
    storeData.comments.state === FetchingState.Fetched &&
    storeData.post.data.id.toString() === id.toString()
  ) {
    const data = storeData.comments.fetchedData
    const parsedComments = parseComments(data.comments, options)
    const flattenComments = flatten(parsedComments)
    const commentsWithLevelInfo = setLevelInfo(flattenComments)

    dispatch({
      type: COMMENTS_FETCH_FULFILLED,
      payload: { comments: commentsWithLevelInfo, fetchedData: data },
    })
  }
}

/**
 * Gets post comments and dispatches the data to the `post` store
 * @param id Post ID
 */
export const getPostComments = (
  id: number | string,
  options: Partial<GetPostCommentsOptions> = {}
) => async (dispatch, getState: () => RootState) => {
  const state = getState()
  const storeData = state.post
  const authData = state.auth.authorizedRequestData
  if (
    storeData.comments.state === FetchingState.Fetched &&
    storeData.post.data.id.toString() === id.toString()
  ) {
    return Promise.resolve()
  }

  dispatch({ type: COMMENTS_FETCH })

  try {
    const data = await api.getComments(id, authData)
    const parsedComments = parseComments(data.comments, options)
    const flattenComments = flatten(parsedComments)
    const commentsWithLevelInfo = setLevelInfo(flattenComments)

    dispatch({
      type: COMMENTS_FETCH_FULFILLED,
      payload: {
        comments: commentsWithLevelInfo,
        fetchedData: data,
        parseOptions: options,
      },
    })
  } catch (error) {
    dispatch({ type: COMMENTS_FETCH_REJECTED, payload: error?.message })
  }
}

export const setPostCommentSize = (id: number | string, size: number) => (
  dispatch,
  getState: () => RootState
) => {
  const sizesMap = getState().post.comments.sizesMap

  if (!sizesMap[id]) {
    dispatch({ type: SET_POST_COMMENT_SIZE, payload: { id, size } })
  }
}

/**
 * Gets post comments and dispatches the data to the `post` store
 * @param id Post ID
 */
export const getCompany = (alias: string) => async (
  dispatch,
  getState: () => RootState
) => {
  const storeData = getState().post
  if (
    storeData.company.state === FetchingState.Fetched &&
    alias === storeData.company.data.alias
  ) {
    return Promise.resolve()
  }

  dispatch({ type: COMPANY_FETCH })

  try {
    const data = await apiGetCompany(alias)
    dispatch({
      type: COMPANY_FETCH_FULFILLED,
      payload: data,
    })
  } catch (error) {
    dispatch({ type: COMPANY_FETCH_REJECTED, payload: error?.message })
  }
}
