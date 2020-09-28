import * as api from 'src/api/user'
import {
  USER_PROFILE_DATA,
  USER_PROFILE_CHILDREN,
  USER_PROFILE_COMPANIES,
  USER_PROFILE_HUBS,
  USER_ARTICLES,
} from '../reducers/user/types'

export const request = async (
  method: string,
  storeType: string,
  params: unknown[],
  dispatch
) => {
  const type = storeType + 'FETCH'
  dispatch({ type })

  try {
    const data = await api[method](...params)
    
    dispatch({
      type: type + '_FULFILLED',
      payload: { data: data?.data },
    })
  } catch (error) {
    dispatch({ type: type + '_REJECTED', payload: { error: error.message, ...params } })
  }
}

export const getUser = (login: string) => async (dispatch) => {
  return await request('getUser', USER_PROFILE_DATA, [login], dispatch)
}

export const getUserCompanies = (login: string) => async (dispatch) => {
  return await request(
    'getUserCompanies',
    USER_PROFILE_COMPANIES,
    [login],
    dispatch
  )
}

export const getUserChildren = (login: string) => async (dispatch) => {
  return await request(
    'getUserChildren',
    USER_PROFILE_CHILDREN,
    [login],
    dispatch
  )
}

export const getUserHubs = (login: string) => async (dispatch) => {
  return await request('getUserHubs', USER_PROFILE_HUBS, [login], dispatch)
}

export const getUserArticles = (login: string, page: number) => async (dispatch) => {
  const type = USER_ARTICLES + 'FETCH'
  dispatch({ type })

  try {
    const data = await api.getUserArticles(login, page)

    dispatch({
      type: type + '_FULFILLED',
      payload: { data, page, pagesCount: data.pagesCount },
    })
  } catch (error) {
    dispatch({ type: type + '_REJECTED', payload: { error, page } })
  }
}
