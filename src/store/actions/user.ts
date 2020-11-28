import { GET_PROFILE, GET_TOKEN } from '../reducers/user/types'
import { getToken as authGetToken } from 'habra-auth'
import { getUserProfile } from 'src/api/user'

export const getToken = (email: string, password: string) => async (
  dispatch
) => {
  const type = GET_TOKEN + '_FETCH'

  dispatch({ type })

  try {
    const data = await authGetToken(email, password)

    dispatch({
      type: type + '_FULFILLED',
      payload: data.access_token,
    })
  } catch (error) {
    dispatch({ type: type + '_REJECTED', payload: error.message })
  }
}

export const getMe = (token: string) => async (dispatch) => {
  const type = GET_PROFILE + '_FETCH'

  dispatch({ type })

  try {
    const data = await getUserProfile(token)

    dispatch({
      type: type + '_FULFILLED',
      payload: data,
    })
  } catch (error) {
    dispatch({ type: type + '_REJECTED', payload: error.message })
  }
}
