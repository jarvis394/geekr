import { GET_PROFILE, SET_TOKEN } from '../reducers/user/types'
import { getUserProfile } from 'src/api/user'

export const setToken = (token: string) => async (dispatch) => {
  dispatch({ type: SET_TOKEN, payload: token })
  localStorage.setItem('token', token)
}

export const getMe = (token: string) => async (dispatch) => {
  const type = GET_PROFILE + '_FETCH'

  dispatch({ type })

  try {
    const { data } = await getUserProfile(token)

    dispatch({
      type: type + '_FULFILLED',
      payload: data,
    })
  } catch (error) {
    dispatch({ type: type + '_REJECTED', payload: error.message })
  }
}
