import { UserSettings } from 'src/interfaces'
import { SET_SETTINGS, GET_SETTINGS } from '../reducers/settings/types'

export const setSettings = (payload: Partial<UserSettings>) => (dispatch) =>
  dispatch({
    type: SET_SETTINGS,
    payload,
  })

export const getSettings = () => (dispatch) =>
  dispatch({
    type: GET_SETTINGS,
  })
