import * as api from 'src/api'
import { FlowAlias } from 'src/interfaces'
import { shouldUpdate } from 'src/utils/cache'
import { RootState } from '..'
import { NEWS_PREFIX } from '../reducers/news/types'

export const getNews = (page: number, flow: FlowAlias = 'all', forceUpdate = false) => async (
  dispatch,
  getState: () => RootState
) => {
  const type = NEWS_PREFIX + 'FETCH'

  // Get data from root store to find out if we're going to fetch a data or not
  const storeState = getState()
  const storeData =
    flow === 'all'
      ? storeState.news.data.pages[page]
      : storeState.news.flows[flow].pages[page]
  if (!shouldUpdate(storeData) && !forceUpdate) {
    return Promise.resolve()
  }

  dispatch({ type, payload: { page, flow } })

  try {
    const data = await api.getNews(page, flow)
    const pagesCount = data?.pagesCount

    dispatch({
      type: type + '_FULFILLED',
      payload: { data, page, pagesCount, flow },
    })
  } catch (error) {
    dispatch({ type: type + '_REJECTED', payload: { error, page, flow } })
  }
}

export const getNewsPromo = (hubAlias?: string) => async (
  dispatch,
  getState: () => RootState
) => {
  const type = NEWS_PREFIX + 'PROMO_FETCH'
  // Get data from root store to find out if we're going to fetch a data or not
  const storeData = getState().news.block
  if (!hubAlias && !shouldUpdate(storeData)) {
    return Promise.resolve()
  }

  dispatch({ type })

  try {
    const data = await api.getNewsPromo(hubAlias)
    dispatch({ type: type + '_FULFILLED', payload: { data } })
  } catch (error) {
    dispatch({ type: type + '_REJECTED', error })
  }
}
