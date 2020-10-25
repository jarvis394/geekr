import * as React from 'react'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import { makeStyles } from '@material-ui/core/styles/'
import AppRouter from './Router'
import AppBar from './blocks/AppBar'
import { BrowserRouter as Router } from 'react-router-dom'
import { MIN_WIDTH as minWidth } from '../config/constants'
import isMobile from 'is-mobile'
import Footer from './blocks/Footer'
import Tabs from './blocks/Tabs/RouterTabs'
import { use } from 'mobx-react'

const chromeAddressBarHeight = 56
const useStyles = makeStyles((theme) => ({
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
}))



const App = (props): React.ReactElement => {
  const classes = useStyles()
  const theme = createMuiTheme(storeTheme)

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppBar />
        <div className={classes.app}>
          <Tabs />
          <AppRouter />
        </div>
        <Footer />
      </Router>
    </ThemeProvider>
  )
}

export default inject('mainStore')(observer(App))
