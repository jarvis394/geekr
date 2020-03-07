import { blue } from '@material-ui/core/colors'

const localStorageThemeType = localStorage.getItem('theme')
const type = localStorageThemeType || 'light'

export const makeBackgroundColors = t => ({
  default: t === 'dark' ? '#121212' : '#fafafa',
  paper: t === 'dark' ? '#212121' : '#fff',
})

export default {
  palette: {
    type,
    primary: {
      main: blue.A400,
      light: blue.A400,
      dark: blue.A200,
    },
    secondary: { main: '#fff' },
    background: makeBackgroundColors(type),
  },
  shape: { borderRadius: 4 },
}
