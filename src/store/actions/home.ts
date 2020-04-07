import * as api from 'src/api'
import { Mode } from 'src/api/getPosts'
import { HOME_PREFIX } from '../reducers/home/types'

export const getPosts = (mode: Mode, page: number) => async (dispatch) => {
  const type = HOME_PREFIX + mode.toUpperCase() + '_FETCH'
  dispatch({ type, payload: { page } })

  try {
    const data = await api.getPosts(mode, page)
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
