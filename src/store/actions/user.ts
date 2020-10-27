import * as api from 'src/api/user'
import {
  USER_PROFILE_DATA,
  USER_PROFILE_CHILDREN,
  USER_PROFILE_COMPANIES,
  USER_PROFILE_HUBS,
  USER_ARTICLES,
} from '../reducers/user/types'

interface RequestParams {
  method: string
  storeType: string
  params: unknown[]
  v2?: boolean
  dispatch: (...params: unknown[]) => unknown
}

export const request = async ({
  method,
  storeType,
  params,
  v2 = false,
  dispatch
}: RequestParams) => {
  const type = storeType + 'FETCH'
  dispatch({ type })

  try {
    const data = await api[method](...params)

    dispatch({
      type: type + '_FULFILLED',
      payload: { data: v2 ? data : data?.data },
    })
  } catch (error) {
    dispatch({ type: type + '_REJECTED', payload: { error: error.message, ...params } })
  }
}

export const getUser = (login: string) => async (dispatch) => {
  return await request({
    method: 'getUser',
    storeType: USER_PROFILE_DATA,
    params: [login], dispatch
  })
}

export const getUserCompanies = (login: string) => async (dispatch) => {
  return await request({
    method: 'getUserCompanies',
    storeType: USER_PROFILE_COMPANIES,
    params: [login],
    dispatch
  })
}

export const getUserChildren = (login: string) => async (dispatch) => {
  return await request({
    method: 'getUserChildren',
    storeType: USER_PROFILE_CHILDREN,
    params: [login],
    dispatch
  })
}

export const getUserHubs = (login: string) => async (dispatch) => {
  return await request({
    method: 'getUserHubs',
    storeType: USER_PROFILE_HUBS,
    params: [login],
    v2: true,
    dispatch
  })
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
