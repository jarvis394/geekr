import * as api from 'src/api'
import { NEWS_PREFIX } from '../reducers/news/types'

export const getNews = (page: number) => async (dispatch) => {
  const type = NEWS_PREFIX + 'FETCH'
  dispatch({ type, payload: { page } })

  try {
    const data = await api.getNews(page)
    const pagesCount = data?.data?.pagesCount || null
    if (!data.success) throw new Error('did not fetch')

    dispatch({
      type: type + '_FULFILLED',
      payload: { data: data.data, page, pagesCount },
    })
  } catch (error) {
    dispatch({ type: type + '_REJECTED', payload: { error, page } })
  }
}

export const getNewsPromo = () => async (dispatch) => {
  const type = NEWS_PREFIX + 'PROMO_FETCH'
  dispatch({ type })

  try {
    const data = await api.getNewsPromo()
    if (!data.success) throw new Error('did not fetch')

    dispatch({ type: type + '_FULFILLED', data: data.data })
  } catch (error) {
    dispatch({ type: type + '_REJECTED', error })
  }
}
