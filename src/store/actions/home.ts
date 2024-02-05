import * as api from 'src/api'
import { Mode } from 'src/config/constants'
import FlowAlias from 'src/interfaces/FlowAlias'
import { shouldUpdate } from 'src/utils/cache'
import { RootState } from '..'
import {
  HOME_PREFIX,
  ADVERTS_PREFIX,
  SIDEBAR_MOST_READING,
  SIDEBAR_TOP_COMPANIES,
  SET_HOME_POST_ITEM_SIZE,
} from '../reducers/home/types'

interface GetPostsParams {
  mode: Mode
  page: number
  flow: FlowAlias
  forceUpdate?: boolean
}

export const getPosts =
  ({ mode, page, flow, forceUpdate = false }: GetPostsParams) =>
  // TODO: fix types
  //@ts-expect-error
    async (dispatch, getState: () => RootState) => {
      const type = HOME_PREFIX + 'FETCH'
      // Get data from root store to find out if we're going to fetch a data or not
      const storeState = getState()
      const authData = storeState.auth.authorizedRequestData
      const storeData =
      flow === 'all'
        ? storeState.home.data[mode].pages[page]
        : storeState.home.flows.data[flow][mode].pages[page]

      if (!shouldUpdate(storeData) && !forceUpdate) {
        return Promise.resolve()
      }

      dispatch({ type, payload: { mode, flow } })

      try {
        const data = await api.getPosts({ mode, page, flow, authData })
        const pagesCount = data?.pagesCount

        dispatch({
          type: type + '_FULFILLED',
          payload: { data: data, mode, page, pagesCount, flow },
        })
      } catch (error) {
        dispatch({
          type: type + '_REJECTED',
          payload: { error: (error as Error)?.message, mode, page, flow },
        })
      }
    }

// TODO: fix types
//@ts-expect-error
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
    dispatch({
      type: type + '_REJECTED',
      payload: { error: (error as Error)?.message },
    })
  }
}

export const getMostReading =
  // TODO: fix types
  //@ts-expect-error
  () => async (dispatch, getState: () => RootState) => {
    const type = SIDEBAR_MOST_READING + 'FETCH'
    const authData = getState().auth.authorizedRequestData

    dispatch({ type })

    try {
      const data = await api.getMostReadingArticles(authData)

      dispatch({
        type: type + '_FULFILLED',
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: type + '_REJECTED',
        payload: { error: (error as Error)?.message },
      })
    }
  }

// TODO: fix types
//@ts-expect-error
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
    dispatch({
      type: type + '_REJECTED',
      payload: { error: (error as Error)?.message },
    })
  }
}

export const setPostItemSize =
  (id: number | string, size: number) =>
  // TODO: fix types
  //@ts-expect-error
    (dispatch, getState: () => RootState) => {
      const sizesMap = getState().home.sizesMap

      // TODO: fix types
      //@ts-expect-error
      if (!sizesMap[id]) {
        dispatch({ type: SET_HOME_POST_ITEM_SIZE, payload: { id, size } })
      }
    }
