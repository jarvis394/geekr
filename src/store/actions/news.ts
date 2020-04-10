import * as api from 'src/api'
import { NEWS_PREFIX } from '../reducers/news/types'
import {
  getNews as getCachedNews,
  getNewsPromo as getCachedNewsPromo,
  shouldUpdate,
} from 'src/utils/cache'
import { RootState } from '..'

export const getNews = (page: number) => async (dispatch, getState: () => RootState) => {
  const cachedData = getCachedNews()[page]
  const storeData = getState().news.data.pages[page]
  if (!shouldUpdate(storeData, cachedData)) {
    return Promise.resolve()
  }

  const type = NEWS_PREFIX + 'FETCH'
  dispatch({ type, payload: { page } })

  try {
    const data = await api.getNews(page)
    const pagesCount = data?.data?.pagesCount || null
    if (!data.success) throw new Error('did not fetch')

    // Dispatch an action
    dispatch({
      type: type + '_FULFILLED',
      payload: { data: data.data, page, pagesCount },
    })
  } catch (error) {
    dispatch({ type: type + '_REJECTED', payload: { error, page } })
  }
}

export const getNewsPromo = () => async (dispatch, getState: () => RootState) => {
  const type = NEWS_PREFIX + 'PROMO_FETCH'
  const cachedData = getCachedNewsPromo()
  const storeData = getState().news.block
  if (!shouldUpdate(storeData, cachedData)) {
    return Promise.resolve()
  }

  dispatch({ type })

  try {
    const data = await api.getNewsPromo()
    if (!data.success) {
      console.error('Error on getting news promo:', data)
      throw new Error('Возникла ошибка при получении блока новостей')
    }

    dispatch({ type: type + '_FULFILLED', payload: { data: data.data.items } })
  } catch (error) {
    dispatch({ type: type + '_REJECTED', error })
  }
}