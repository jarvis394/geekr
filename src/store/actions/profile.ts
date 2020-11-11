import * as api from 'src/api/profile'
import {
  PROFILE_DATA,
  PROFILE_CHILDREN,
  PROFILE_COMPANIES,
  PROFILE_HUBS,
  PROFILE_ARTICLES,
} from '../reducers/profile/types'

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
  dispatch,
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
    dispatch({
      type: type + '_REJECTED',
      payload: { error: error.message, ...params },
    })
  }
}

export const getProfile = (login: string) => async (dispatch) => {
  return await request({
    method: 'getProfile',
    storeType: PROFILE_DATA,
    params: [login],
    dispatch,
  })
}

export const getProfileCompanies = (login: string) => async (dispatch) => {
  return await request({
    method: 'getProfileCompanies',
    storeType: PROFILE_COMPANIES,
    params: [login],
    dispatch,
  })
}

export const getProfileChildren = (login: string) => async (dispatch) => {
  return await request({
    method: 'getProfileChildren',
    storeType: PROFILE_CHILDREN,
    params: [login],
    dispatch,
  })
}

export const getProfileHubs = (login: string) => async (dispatch) => {
  return await request({
    method: 'getProfileHubs',
    storeType: PROFILE_HUBS,
    params: [login],
    v2: true,
    dispatch,
  })
}

export const getProfileArticles = (login: string, page: number) => async (
  dispatch
) => {
  const type = PROFILE_ARTICLES + 'FETCH'
  dispatch({ type })

  try {
    const data = await api.getProfileArticles(login, page)

    dispatch({
      type: type + '_FULFILLED',
      payload: { data, page, pagesCount: data.pagesCount },
    })
  } catch (error) {
    dispatch({ type: type + '_REJECTED', payload: { error, page } })
  }
}
