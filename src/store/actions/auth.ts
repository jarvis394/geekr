import { GET_ME, GET_AUTH_DATA, GET_CSRF_TOKEN, USER_LOGOUT } from '../reducers/auth/types'
import * as api from 'src/api/auth'
import AccountAuthData from 'src/interfaces/AccountAuthData'
import { AuthorizedRequestParams } from 'src/interfaces'

export const getAccountAuthData = (props: {
  email: string
  password: string
}) => async (dispatch) => {
  const type = GET_AUTH_DATA + '_FETCH'

  dispatch({ type })

  try {
    const data = await api.getAccountAuthData(props)

    if (data.error) {
      return dispatch({ type: type + '_REJECTED', payload: data })
    }

    dispatch({
      type: type + '_FULFILLED',
      payload: data,
    })
  } catch (error) {
    dispatch({ type: type + '_REJECTED', payload: error })
  }
}

export const getCSRFToken = (props: AccountAuthData) => async (dispatch) => {
  const type = GET_CSRF_TOKEN + '_FETCH'

  dispatch({ type })

  try {
    const data = await api.getCSRFToken(props)

    if (typeof data !== 'string') {
      return dispatch({ type: type + '_REJECTED', payload: data })
    }

    dispatch({
      type: type + '_FULFILLED',
      payload: data,
    })
  } catch (error) {
    dispatch({ type: type + '_REJECTED', payload: error })
  }
}

export const getMe = (params: AuthorizedRequestParams) => async (dispatch) => {
  const type = GET_ME + '_FETCH'

  dispatch({ type })

  try {
    const data = await api.getMe(params)

    dispatch({
      type: type + '_FULFILLED',
      payload: data,
    })
  } catch (error) {
    dispatch({ type: type + '_REJECTED', payload: error.message })
  }
}

export const userLogout = () => async (dispatch) => {
  dispatch({ type: USER_LOGOUT })
}
