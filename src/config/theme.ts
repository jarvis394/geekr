import { blue } from '@material-ui/core/colors'
import { darken, ThemeOptions } from '@material-ui/core/styles'
import { PaletteType as MUIPaletteType } from '@material-ui/core'
import {
  BACKGROUND_COLORS_DEFAULT,
  BACKGROUND_COLORS_PAPER,
  THEME_TYPES,
  PaletteType,
  THEME_PRIMARY_COLORS,
  THEME_TEXT_COLORS,
} from './constants'
import * as userSettings from 'src/utils/userSettings'

export const makeBackgroundColors = (
  t: PaletteType | string
): {
  default: string
  paper: string
} => ({
  default: BACKGROUND_COLORS_DEFAULT[t],
  paper: BACKGROUND_COLORS_PAPER[t],
})

export const makePrimaryColors = (
  t: PaletteType | string
): {
  main: string
  light: string
  dark: string
} => (THEME_PRIMARY_COLORS[t])

export const makeTextColors = (
  t: PaletteType | string
): {
  primary: string
  secondary: string
  disabled: string
  hint: string
} => (THEME_TEXT_COLORS[t])

export const makeType = (
  t: PaletteType | string
): MUIPaletteType => (THEME_TYPES[t])

const generateTheme = (themeType?: PaletteType | string): ThemeOptions => {
  const localStorageUserSettings = userSettings.get()
  const localStorageCustomThemes = localStorageUserSettings.customThemes
  const localStorageThemeType = localStorageUserSettings.themeType
  const type = (localStorageThemeType || 'light') as MUIPaletteType
  const customTheme = localStorageCustomThemes.find(e => e.type === type)
   
  return {
    palette: customTheme ? customTheme.palette : {
      type: makeType(themeType || type),
      primary: makePrimaryColors(themeType || type),
      background: makeBackgroundColors(themeType || type),
      text: makeTextColors(themeType || type),
    },
    shape: { borderRadius: 4 },
    overrides: {
      MuiTab: {
        wrapper: {
          flexDirection: 'row',
        },
      },
    },
    props: {
      // Ripple on IconButtons is delayed and not very effective in its action
      // So we change its styles to the custom ones
      MuiIconButton: {
        TouchRippleProps: {
          classes: {
            rippleVisible: 'IconButton_TouchRipple-rippleVisible',
            childLeaving: 'IconButton_TouchRipple-childLeaving'
          },
        },
      },
    },
  }
}

export default generateTheme
