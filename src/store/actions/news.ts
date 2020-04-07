import * as api from 'src/api'
import { NEWS_PREFIX } from '../reducers/news/types'

export const getNews = (page: number) => async (dispatch) => {
  const type = NEWS_PREFIX + '_FETCH'
  dispatch({ type, page })

  try {
    const data = await api.getNews(page)
    dispatch({ type: type + '_FULFILLED', data, page })
  } catch (error) {
    dispatch({ type: type + '_REJECTED', error, page })
  }
}

export const getNewsPromo = () => async (dispatch) => {
  const type = NEWS_PREFIX + 'PROMO_FETCH'
  dispatch({ type })

  try {
    const data = await api.getNewsPromo()
    dispatch({ type: type + '_FULFILLED', data })
  } catch (error) {
    dispatch({ type: type + '_REJECTED', error })
  }
}