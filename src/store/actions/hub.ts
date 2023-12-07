import {
  GET_AUTHORS,
  GET_COMPANIES,
  GET_NEWS,
  GET_POSTS,
  GET_PROFILE,
} from '../reducers/hub/types'
import getHubProfile from 'src/api/getHub'
import getHubAuthorsRequest from 'src/api/getHubAuthors'
import getHubCompaniesRequest from 'src/api/getHubCompanies'
import getHubPostsRequest from 'src/api/getHubPosts'
import getNewsPromo from 'src/api/getNewsPromo'
import { Mode } from 'src/config/constants'
import { RootState } from '..'

/**
 * Gets hub's profile data
 * @param alias Hub alias
 */
export const getHub =
  (alias: string) =>
  async (
    // TODO: fix types
    //@ts-expect-error
    dispatch,
    getState: () => RootState
  ) => {
    const type = GET_PROFILE + '_FETCH'
    const authData = getState().auth.authorizedRequestData

    dispatch({ type })

    try {
      const data = await getHubProfile(alias, authData)

      dispatch({
        type: type + '_FULFILLED',
        payload: data,
      })
    } catch (error) {
      dispatch({ type: type + '_REJECTED', payload: (error as Error)?.message })
    }
  }

/**
 * Gets hub's news promo
 * @param alias Hub alias
 */
export const getHubNews =
  // TODO: fix types
  //@ts-expect-error
  (alias: string) => async (dispatch, getState: () => RootState) => {
    const type = GET_NEWS + '_FETCH'
    const authData = getState().auth.authorizedRequestData

    dispatch({ type })

    try {
      const data = await getNewsPromo({ hubAlias: alias, authData })

      dispatch({
        type: type + '_FULFILLED',
        payload: data,
      })
    } catch (error) {
      dispatch({ type: type + '_REJECTED', payload: (error as Error)?.message })
    }
  }

/**
 * Gets hub's posts
 * @param mode Mode
 * @param page Page number
 * @param alias Hub alias
 */
export const getHubPosts =
  (mode: Mode, page: number, alias: string) =>
  // TODO: fix types
  //@ts-expect-error
  async (dispatch, getState: () => RootState) => {
    const type = GET_POSTS + '_FETCH'
    const authData = getState().auth.authorizedRequestData

    dispatch({ type })

    try {
      const data = await getHubPostsRequest({ mode, page, alias, authData })

      dispatch({
        type: type + '_FULFILLED',
        payload: data,
      })
    } catch (error) {
      dispatch({ type: type + '_REJECTED', payload: (error as Error)?.message })
    }
  }

/**
 * Gets hub's authors
 */
export const getHubAuthors =
  ({ alias, page }: { alias: string; page: number }) =>
  // TODO: fix types
  //@ts-expect-error
  async (dispatch) => {
    const type = GET_AUTHORS + '_FETCH'

    dispatch({ type })

    try {
      const data = await getHubAuthorsRequest({ alias, page })

      dispatch({
        type: type + '_FULFILLED',
        payload: data,
      })
    } catch (error) {
      dispatch({ type: type + '_REJECTED', payload: (error as Error)?.message })
    }
  }

/**
 * Gets hub's companies
 * @param alias Hub alias
 * @param page Page number
 */
export const getHubCompanies =
  // TODO: fix types
  //@ts-expect-error
  (alias: string, page: number) => async (dispatch) => {
    const type = GET_COMPANIES + '_FETCH'

    dispatch({ type })

    try {
      const data = await getHubCompaniesRequest({ alias, page })

      dispatch({
        type: type + '_FULFILLED',
        payload: data,
      })
    } catch (error) {
      dispatch({ type: type + '_REJECTED', payload: (error as Error)?.message })
    }
  }
