import { createMuiTheme } from '@material-ui/core/styles'
import { blue } from '@material-ui/core/colors'

export default createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: blue.A400,
      light: blue.A400,
      dark: blue.A200,
    },
    secondary: { main: '#fff' },
  },
  shape: { borderRadius: 4 },
})
