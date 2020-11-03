import { SET_THEME, SET_HIDDEN_AUTHORS, SET_HIDDEN_COMPANIES } from './types'
import generateTheme from 'src/config/theme'

const theme = generateTheme()
const localStorageThemeType = localStorage.getItem('theme')
const localStorageHiddenAuthors = localStorage.getItem('hiddenAuthors')
const localStorageHiddenCompanies = localStorage.getItem('hiddenCompanies')
const hiddenAuthors = localStorageHiddenAuthors
  ? localStorageHiddenAuthors.split(',')
  : []
const hiddenCompanies = localStorageHiddenCompanies
  ? localStorageHiddenCompanies.split(',')
  : []
const type = localStorageThemeType || 'light'

const initialState = {
  theme,
  themeType: type,
  hiddenAuthors,
  hiddenCompanies,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_THEME:
      return { ...state, theme: generateTheme(payload), themeType: payload }

    case SET_HIDDEN_AUTHORS:
      localStorage.setItem('hiddenAuthors', payload)
      return { ...state, hiddenAuthors: payload }

    case SET_HIDDEN_COMPANIES:
      localStorage.setItem('hiddenCompanies', payload)
      return { ...state, hiddenCompanies: payload }

    default:
      return state
  }
}
