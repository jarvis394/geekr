import { SET_THEME } from './types'
import generateTheme from 'src/config/theme'

const initialState = {
  theme: generateTheme()
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_THEME:
      return { ...state, theme: generateTheme(payload) }

    default:
      return state
  }
}
