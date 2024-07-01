import { UserSettings } from 'src/interfaces'
import { SET_SETTINGS, GET_SETTINGS } from '../reducers/settings/types'

// TODO: fix types
//@ts-expect-error temporary fix
export const setSettings = (payload: Partial<UserSettings>) => (dispatch) =>
  dispatch({
    type: SET_SETTINGS,
    payload,
  })

// TODO: fix types
//@ts-expect-error temporary fix
export const getSettings = () => (dispatch) =>
  dispatch({
    type: GET_SETTINGS,
  })
