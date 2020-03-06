import { blue } from '@material-ui/core/colors'

const localStorageThemeType = localStorage.getItem('theme')
const type = localStorageThemeType || 'light'

export default {
  palette: {
    type,
    primary: {
      main: blue.A400,
      light: blue.A400,
      dark: blue.A200,
    },
    secondary: { main: '#fff' },
    background: {
      default: type === 'dark' ? '#121212' : '#fafafa',
      paper: type === 'dark' ? '#212121' : '#fff'
    }
  },
  shape: { borderRadius: 4 },
}
