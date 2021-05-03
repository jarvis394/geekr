import * as api from 'src/api'
import { Mode } from 'src/config/constants'
import { shouldUpdate } from 'src/utils/cache'
import { RootState } from '..'
import {
  HOME_PREFIX,
  ADVERTS_PREFIX,
  SIDEBAR_MOST_READING,
  SIDEBAR_TOP_COMPANIES,
} from '../reducers/home/types'

export const getPosts = (mode: Mode, page: number) => async (
  dispatch,
  getState: () => RootState
) => {
  const type = HOME_PREFIX + 'FETCH'
  // Get data from root store to find out if we're going to fetch a data or not
  const storeData = getState().home.data[mode].pages[page]
  const token = getState().user.token
  if (!shouldUpdate(storeData)) {
    return Promise.resolve()
  }

  dispatch({ type, payload: mode })

  try {
    const data = await api.getPosts({ mode, page, token })
    const pagesCount = data?.pagesCount

    dispatch({
      type: type + '_FULFILLED',
      payload: { data: data, mode, page, pagesCount, token },
    })
  } catch (error) {
    dispatch({ type: type + '_REJECTED', payload: { error, mode, page } })
  }
}

export const getAdverts = () => async (dispatch) => {
  const type = ADVERTS_PREFIX + 'FETCH'

  dispatch({ type })

  try {
    const data = await api.getAdverts()

    dispatch({
      type: type + '_FULFILLED',
      payload: data.adverts,
    })
  } catch (error) {
    dispatch({ type: type + '_REJECTED', payload: { error } })
  }
}

export const getMostReading = () => async (dispatch) => {
  const type = SIDEBAR_MOST_READING + 'FETCH'

  dispatch({ type })

  try {
    const data = await api.getMostReadingArticles()

    dispatch({
      type: type + '_FULFILLED',
      payload: data,
    })
  } catch (error) {
    dispatch({ type: type + '_REJECTED', payload: { error } })
  }
}

export const getTopCompanies = () => async (dispatch) => {
  const type = SIDEBAR_TOP_COMPANIES + 'FETCH'

  dispatch({ type })

  try {
    const data = await api.getCompanies({})

    dispatch({
      type: type + '_FULFILLED',
      payload: data,
    })
  } catch (error) {
    dispatch({ type: type + '_REJECTED', payload: { error } })
  }
}
