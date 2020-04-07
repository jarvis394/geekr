/** Prefix */
const P = 'SETTINGS_'

export const setTheme = (theme: 'light' | 'dark') => (dispatch) =>
  dispatch({
    type: P + 'SET_THEME',
    payload: theme,
  })
