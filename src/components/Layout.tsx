import * as React from 'react'
import { useState } from 'react'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import makeStyles from '@material-ui/styles/makeStyles'
import theme from '../config/theme'
import AppRouter from './Router'
import AppBar from './blocks/AppBar'
import { BrowserRouter as Router } from 'react-router-dom'
import { MIN_WIDTH as minWidth } from '../config/constants'
import isMobile from 'is-mobile'
import Footer from './blocks/Footer'

const chromeAddressBarHeight = 56
const useStyles = makeStyles({
  app: {
    display: 'flex',
    minHeight: `calc(100vh - 48px - ${
      isMobile() ? chromeAddressBarHeight : 0
    }px - 196px)`,
    borderRadius: 0,
    flexDirection: 'column',
    maxWidth: minWidth,
    margin: '48px auto 0 auto',
  },
})

const Layout = (): React.ReactElement => {
  const initialState = { theme }
  const classes = useStyles()
  const [state, setState] = useState(initialState)

  return (
    <ThemeProvider theme={createMuiTheme(state.theme)}>
      <Router>
        <AppBar setState={setState} />
        <div className={classes.app}>
          <AppRouter state={state} setState={setState} />
        </div>
        <Footer />
      </Router>
    </ThemeProvider>
  )
}

export default Layout
