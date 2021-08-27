import * as api from 'src/api/profile'
import {
  PROFILE_CARD,
  PROFILE_WHOIS,
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

export const getProfileCard = (alias: string) => async (dispatch) => {
  return await request({
    method: 'getProfileCard',
    storeType: PROFILE_CARD,
    params: [alias],
    dispatch,
    v2: true,
  })
}

export const getProfileWhois = (alias: string) => async (dispatch) => {
  return await request({
    method: 'getProfileWhois',
    storeType: PROFILE_WHOIS,
    params: [alias],
    dispatch,
    v2: true,
  })
}

export const getProfileCompanies = (alias: string) => async (dispatch) => {
  return await request({
    method: 'getProfileCompanies',
    storeType: PROFILE_COMPANIES,
    params: [alias],
    dispatch,
    v2: true,
  })
}

export const getProfileChildren = (alias: string) => async (dispatch) => {
  return await request({
    method: 'getProfileChildren',
    storeType: PROFILE_CHILDREN,
    params: [alias],
    dispatch,
    v2: true,
  })
}

export const getProfileHubs = (alias: string) => async (dispatch) => {
  return await request({
    method: 'getProfileHubs',
    storeType: PROFILE_HUBS,
    params: [alias],
    v2: true,
    dispatch,
  })
}

export const getProfileArticles = (alias: string, page: number) => async (
  dispatch
) => {
  const type = PROFILE_ARTICLES + 'FETCH'
  dispatch({ type })

  try {
    const data = await api.getProfileArticles(alias, page)

    dispatch({
      type: type + '_FULFILLED',
      payload: { data, page, pagesCount: data.pagesCount },
    })
  } catch (error) {
    dispatch({
      type: type + '_REJECTED',
      payload: { error: error.message, page },
    })
  }
}
