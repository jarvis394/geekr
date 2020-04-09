import * as api from 'src/api'
import { HUBS_PREFIX } from '../reducers/hubs/types'

export const getHubsList = (page: number) => async (dispatch, getState) => {
  const storeData = getState().hubs.data.pages[page]
  if (storeData) {
    return Promise.resolve()
  }

  const type = HUBS_PREFIX + 'FETCH'
  dispatch({ type })

  try {
    const data = await api.getHubsList(page)
    if (!data.success) throw new Error('did not fetch')

    dispatch({
      type: type + '_FULFILLED',
      payload: { data: data.data, page },
    })
  } catch (error) {
    dispatch({ type: type + '_REJECTED', payload: { error, page } })
  }
}

export const getHubsSearchResults = (query: string) => async (dispatch) => {
  const type = HUBS_PREFIX + 'SEARCH_FETCH'
  dispatch({ type, payload: { query } })

  try {
    const data = await api.getHubsSearchResults(query)
    if (!data.success) throw new Error('did not fetch')

    dispatch({
      type: type + '_FULFILLED',
      payload: { data: data.data, query },
    })
  } catch (error) {
    dispatch({ type: type + '_REJECTED', payload: { error, query } })
  }
}
