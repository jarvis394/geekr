import { createMuiTheme } from '@material-ui/core/styles'
import { blue } from '@material-ui/core/colors'

export default createMuiTheme({
  palette: {
    type: 'light',
    primary: { main: blue.A400 },
    secondary: { main: '#fff' },
  },
  shape: { borderRadius: 8 }
})
