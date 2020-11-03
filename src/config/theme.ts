import { blue } from '@material-ui/core/colors'
import { darken, ThemeOptions } from '@material-ui/core/styles'
import { PaletteType as MUIPaletteType } from '@material-ui/core'
import {
  BACKGROUND_COLORS_DEFAULT,
  BACKGROUND_COLORS_PAPER,
  THEME_TYPES,
  PaletteType,
} from './constants'

const localStorageThemeType = localStorage.getItem('theme')
const type = (localStorageThemeType || 'light') as MUIPaletteType

export const makeBackgroundColors = (
  t: PaletteType
): {
  default: string
  paper: string
} => ({
  default: BACKGROUND_COLORS_DEFAULT[t],
  paper: BACKGROUND_COLORS_PAPER[t],
})

export const makePrimaryColors = (
  t: PaletteType
): {
  main: string
  light: string
  dark: string
} => ({
  main: THEME_TYPES[t] === 'dark' ? blue.A100 : blue.A400,
  light: THEME_TYPES[t] === 'dark' ? blue.A100 : blue.A400,
  dark: THEME_TYPES[t] === 'dark' ? darken(blue.A100, 0.1) : blue.A700,
})

const generateTheme = (themeType?: PaletteType): ThemeOptions => ({
  palette: {
    type: THEME_TYPES[themeType || type],
    primary: makePrimaryColors(themeType ? themeType : type),
    secondary: { main: '#fff' },
    background: makeBackgroundColors(themeType ? themeType : type),
  },
  shape: { borderRadius: 4 },
  overrides: {
    MuiTab: {
      wrapper: {
        flexDirection: 'row',
      },
    },
  },
})

export default generateTheme
