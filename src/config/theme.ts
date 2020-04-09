import { blue } from '@material-ui/core/colors'
import { darken, ThemeOptions } from '@material-ui/core/styles'
import { PaletteType } from '@material-ui/core'

const localStorageThemeType = localStorage.getItem('theme')
const type = (localStorageThemeType || 'light') as PaletteType

export const makeBackgroundColors = (
  t: PaletteType
): {
  default: string
  paper: string
} => ({
  default: t === 'dark' ? '#121212' : '#fafafa',
  paper: t === 'dark' ? '#212121' : '#fff',
})

export const makePrimaryColors = (
  t: PaletteType
): {
  main: string
  light: string
  dark: string
} => ({
  main: t === 'dark' ? blue.A100 : blue.A400,
  light: t === 'dark' ? blue.A100 : blue.A400,
  dark: t === 'dark' ? darken(blue.A100, 0.1) : blue.A700,
})

const theme: ThemeOptions = {
  palette: {
    type,
    primary: makePrimaryColors(type),
    secondary: { main: '#fff' },
    background: makeBackgroundColors(type),
  },
  shape: { borderRadius: 4 },
}

export default theme
