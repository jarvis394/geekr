import * as api from 'src/api'
import { Mode } from 'src/api/getPosts'
import { HOME_PREFIX } from '../reducers/home/types'
import { shouldUpdate, getPosts as getCachedPosts } from 'src/utils/cache'

export const getPosts = (mode: Mode, page: number) => async (
  dispatch,
  getState
) => {
  const cachedDataGlobal = getCachedPosts()
  const cachedData = cachedDataGlobal
    ? cachedDataGlobal[mode].pages[page]
    : null
  const storeData = getState().home.data[mode].pages[page]
  if (!shouldUpdate(storeData, cachedData)) {
    return Promise.resolve()
  }

  const type = HOME_PREFIX + 'FETCH'
  dispatch({ type })

  try {
    const data = await api.getPosts(mode, page)
    const pagesCount = data?.pagesCount

    dispatch({
      type: type + '_FULFILLED',
      payload: { data: data, mode, page, pagesCount },
    })
  } catch (error) {
    dispatch({ type: type + '_REJECTED', payload: { error, mode, page } })
  }
}
