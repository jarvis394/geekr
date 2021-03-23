import { GET_AUTHORS, GET_COMPANIES, GET_NEWS, GET_POSTS, GET_PROFILE } from '../reducers/hub/types'
import getHubProfile from 'src/api/getHub'
import getHubAuthorsRequest from 'src/api/getHubAuthors'
import getHubCompaniesRequest from 'src/api/getHubCompanies'
import getHubPostsRequest from 'src/api/getHubPosts'
import getNewsPromo from 'src/api/getNewsPromo'
import { Mode } from 'src/config/constants'

/**
 * Gets hub's profile data
 * @param alias Hub alias
 */
export const getHub = (alias: string) => async (dispatch) => {
  const type = GET_PROFILE + '_FETCH'

  dispatch({ type })

  try {
    const data = await getHubProfile(alias)

    dispatch({
      type: type + '_FULFILLED',
      payload: data,
    })
  } catch (error) {
    dispatch({ type: type + '_REJECTED', payload: error.message })
  }
}

/**
 * Gets hub's news promo
 * @param alias Hub alias
 */
export const getHubNews = (alias: string) => async (dispatch) => {
  const type = GET_NEWS + '_FETCH'

  dispatch({ type })

  try {
    const data = await getNewsPromo(alias)

    dispatch({
      type: type + '_FULFILLED',
      payload: data,
    })
  } catch (error) {
    dispatch({ type: type + '_REJECTED', payload: error.message })
  }
}

/**
 * Gets hub's posts
 * @param mode Mode
 * @param page Page number
 * @param alias Hub alias
 */
export const getHubPosts = (mode: Mode, page: number, alias: string) => async (dispatch) => {
  const type = GET_POSTS + '_FETCH'

  dispatch({ type })

  try {
    const data = await getHubPostsRequest({ mode, page, alias })

    dispatch({
      type: type + '_FULFILLED',
      payload: data,
    })
  } catch (error) {
    dispatch({ type: type + '_REJECTED', payload: error.message })
  }
}

/**
 * Gets hub's authors
 * @param alias Hub alias
 * @param page Page number
 */
export const getHubAuthors = (alias: string, page: number) => async (dispatch) => {
  const type = GET_AUTHORS + '_FETCH'

  dispatch({ type })

  try {
    const data = await getHubAuthorsRequest(alias, page)

    dispatch({
      type: type + '_FULFILLED',
      payload: data,
    })
  } catch (error) {
    dispatch({ type: type + '_REJECTED', payload: error.message })
  }
}

/**
 * Gets hub's companies
 * @param alias Hub alias
 * @param page Page number
 */
export const getHubCompanies = (alias: string, page: number) => async (dispatch) => {
  const type = GET_COMPANIES + '_FETCH'

  dispatch({ type })

  try {
    const data = await getHubCompaniesRequest(alias, page)

    dispatch({
      type: type + '_FULFILLED',
      payload: data,
    })
  } catch (error) {
    dispatch({ type: type + '_REJECTED', payload: error.message })
  }
}
