import { PaletteType } from 'src/config/constants'

/** Prefix */
const P = 'SETTINGS_'

export const setTheme = (theme: PaletteType) => (dispatch) =>
  dispatch({
    type: P + 'SET_THEME',
    payload: theme,
  })
