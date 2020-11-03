import { PaletteType } from 'src/config/constants'
import {
  SET_HIDDEN_AUTHORS,
  SET_HIDDEN_COMPANIES,
  SET_THEME,
} from '../reducers/settings/types'

export const setTheme = (theme: PaletteType) => (dispatch) =>
  dispatch({
    type: SET_THEME,
    payload: theme,
  })

export const setHiddenAuthors = (data: string[]) => (dispatch) =>
  dispatch({
    type: SET_HIDDEN_AUTHORS,
    payload: data,
  })

export const setHiddenCompanies = (data: string[]) => (dispatch) =>
  dispatch({
    type: SET_HIDDEN_COMPANIES,
    payload: data,
  })
