import * as api from 'src/api'
import apiGetCompany from 'src/api/getCompany'
import { FetchingState } from 'src/interfaces'
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
} from '../reducers/post/types'

/**
 * Gets post data and dispatches it to the `post` store
 * @param id Post ID
 */
export const getPost = (id: number) => async (
  dispatch,
  getState: () => RootState
) => {
  const storeData = getState().post.post
  if (
    storeData.state === FetchingState.Fetched &&
    Number(storeData.data.id) === id
  ) {
    return Promise.resolve()
  }

  dispatch({ type: POST_FETCH })

  try {
    const data = await api.getPost(id)
    dispatch({
      type: POST_FETCH_FULFILLED,
      payload: data,
    })
  } catch (error) {
    dispatch({ type: POST_FETCH_REJECTED, payload: error })
  }
}

/**
 * Gets post comments and dispatches the data to the `post` store
 * @param id Post ID
 */
export const getPostComments = (id: number) => async (
  dispatch,
  getState: () => RootState
) => {
  const storeData = getState().post
  if (
    storeData.comments.state === FetchingState.Fetched &&
    Number(storeData.post.data.id) === id
  ) {
    return Promise.resolve()
  }

  dispatch({ type: COMMENTS_FETCH })

  try {
    const data = await api.getComments(id)
    dispatch({
      type: COMMENTS_FETCH_FULFILLED,
      payload: data,
    })
  } catch (error) {
    dispatch({ type: COMMENTS_FETCH_REJECTED, payload: error })
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
    const data = (await apiGetCompany(alias)).data
    dispatch({
      type: COMPANY_FETCH_FULFILLED,
      payload: data,
    })
  } catch (error) {
    dispatch({ type: COMPANY_FETCH_REJECTED, payload: error })
  }
}
