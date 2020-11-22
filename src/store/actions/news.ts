import * as api from 'src/api'
import { shouldUpdate } from 'src/utils/cache'
import { RootState } from '..'
import { NEWS_PREFIX } from '../reducers/news/types'

export const getNews = (page: number) => async (
  dispatch,
  getState: () => RootState
) => {
  const type = NEWS_PREFIX + 'FETCH'
  // Get data from root store to find out if we're going to fetch a data or not
  const storeData = getState().news.data.pages[page]
  if (!shouldUpdate(storeData)) {
    return Promise.resolve()
  }

  dispatch({ type, payload: { page } })

  try {
    const data = await api.getNews(page)
    const pagesCount = data?.pagesCount

    dispatch({
      type: type + '_FULFILLED',
      payload: { data, page, pagesCount },
    })
  } catch (error) {
    dispatch({ type: type + '_REJECTED', payload: { error, page } })
  }
}

export const getNewsPromo = () => async (
  dispatch,
  getState: () => RootState
) => {
  const type = NEWS_PREFIX + 'PROMO_FETCH'
  // Get data from root store to find out if we're going to fetch a data or not
  const storeData = getState().news.block
  if (!shouldUpdate(storeData)) {
    return Promise.resolve()
  }

  dispatch({ type })

  try {
    const data = await api.getNewsPromo()
    dispatch({ type: type + '_FULFILLED', payload: { data } })
  } catch (error) {
    dispatch({ type: type + '_REJECTED', error })
  }
}
