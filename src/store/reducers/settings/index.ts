import { SET_SETTINGS, GET_SETTINGS } from './types'
import generateTheme from 'src/config/theme'
import * as userSettings from 'src/utils/userSettings'

const userLocalSettings = userSettings.get()
// TODO: fix types
//@ts-expect-error
const theme = generateTheme(userLocalSettings.themeType)

const initialState = {
  theme,
  ...userLocalSettings,
}

export default (
  state = initialState,
  // TODO: fix types
  //@ts-expect-error
  { type, payload }
): typeof initialState => {
  switch (type) {
    case SET_SETTINGS: {
      const newSettings = userSettings.set(payload)
      const shouldUpdateTheme = !!payload.themeType
      state = {
        ...newSettings,
        theme: shouldUpdateTheme
          ? // TODO: fix types
        //@ts-expect-error
          generateTheme(newSettings.themeType)
          : state.theme,
      }
      return state
    }

    case GET_SETTINGS:
      return { theme: state.theme, ...userSettings.get() }

    default:
      return state
  }
}
