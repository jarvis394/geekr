import { SET_THEME } from './types'

const initialState = {
  theme: localStorage.getItem('theme') || 'light',
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_THEME: {
      if (!(payload in ['light', 'dark'])) {
        console.warn(
          "Could not set 'theme' to ",
          payload,
          "\nDefaulting to 'light'"
        )
        return { ...state, theme: 'light' }
      } else {
        return { ...state, theme: payload }
      }
    }

    default:
      return state
  }
}
