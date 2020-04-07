import * as api from 'src/api'
import { Mode } from 'src/api/getPosts'
import { HOME_PREFIX } from '../reducers/home/types'

export const getPosts = (mode: Mode, page: number) => async (dispatch) => {
  const type = HOME_PREFIX + mode.toUpperCase() + '_FETCH'
  dispatch({ type, page })

  try {
    const data = await api.getPosts(mode, page)
    dispatch({ type: type + '_FULFILLED', data, page })
  } catch (error) {
    dispatch({ type: type + '_REJECTED', error, page })
  }
}