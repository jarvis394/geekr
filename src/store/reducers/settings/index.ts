import { SET_THEME } from './types'
import generateTheme from 'src/config/theme'

const theme = generateTheme()
const localStorageThemeType = localStorage.getItem('theme')
const type = localStorageThemeType || 'light'

const initialState = {
  theme,
  themeType: type
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_THEME:
      return { ...state, theme: generateTheme(payload), themeType: payload }

    default:
      return state
  }
}
