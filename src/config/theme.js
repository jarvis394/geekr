import { blue } from '@material-ui/core/colors'

const localStorageThemeType = localStorage.getItem('theme')
const type = localStorageThemeType || 'light'

export const makeBackgroundColors = t => ({
  default: t === 'dark' ? '#121212' : '#fafafa',
  paper: t === 'dark' ? '#212121' : '#fff',
})

export const makePrimaryColors = t => ({
  main: t === 'dark' ? blue.A100 : blue.A400,
  light: t === 'dark' ? blue.A100 : blue.A400,
  dark: t === 'dark' ? blue.A200 : blue.A700,
})

export default {
  palette: {
    type,
    primary: makePrimaryColors(type),
    secondary: { main: '#fff' },
    background: makeBackgroundColors(type),
  },
  shape: { borderRadius: 4 },
  overrides: {
    MuiListItem: {
      button: { '&:hover': { background: 'transparent !important' } },
    }
  }
}
