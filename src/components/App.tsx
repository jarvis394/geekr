import * as React from 'react'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import { fade, makeStyles, ThemeOptions } from '@material-ui/core/styles/'
import AppRouter from './Router'
import AppBar from './blocks/AppBar'
import { BrowserRouter as Router } from 'react-router-dom'
import {
  APP_BAR_HEIGHT,
  BOTTOM_BAR_HEIGHT,
  chromeAddressBarHeight,
  MIN_WIDTH as minWidth,
} from '../config/constants'
import { lighten, darken } from '@material-ui/core/styles'
import isMobile from 'is-mobile'
import { useSelector } from 'src/hooks'
import ScrollRestoration from 'react-scroll-restoration'
import RouterTitleChange from './RouterTitleChange'
import { SnackbarProvider } from 'notistack'
import BottomBar from './blocks/BottomBar'

const isDarkTheme = (t: ThemeOptions) => t.palette.type === 'dark'
const useStyles = makeStyles(() => ({
  app: {
    display: 'flex',
    minHeight: `calc(100vh - ${APP_BAR_HEIGHT}px - ${
      isMobile() ? chromeAddressBarHeight : 0
    }px - ${BOTTOM_BAR_HEIGHT}px)`,
    borderRadius: 0,
    flexDirection: 'column',
    maxWidth: minWidth,
    margin: `${APP_BAR_HEIGHT}px auto ${BOTTOM_BAR_HEIGHT}px auto`,
  },
  root: {
    /** Disable blue highlight for links. Can be bad for accessibility. */
    '& a': {
      '-webkit-tap-highlight-color': (theme: ThemeOptions) =>
        fade(theme.palette.background.paper, 0.3),
    },
    backgroundColor: (theme: ThemeOptions) => theme.palette.background.default,
    color: (theme: ThemeOptions) => theme.palette.text.primary,
    margin: 0,
    fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, Arial, sans-serif',
    lineHeight: 1.5,
    '&::-webkit-scrollbar': {
      width: 15,
      height: 10,
      background: (theme: ThemeOptions) =>
        isDarkTheme(theme)
          ? lighten(theme.palette.background.default, 0.03)
          : theme.palette.background.paper,
      border: (theme: ThemeOptions) =>
        '1px solid ' + darken(theme.palette.background.paper, 0.05),
    },
    '&::-webkit-scrollbar-thumb': {
      minHeight: 28,
      background: (theme: ThemeOptions) =>
        isDarkTheme(theme)
          ? lighten(theme.palette.background.paper, 0.08)
          : darken(theme.palette.background.paper, 0.08),
      transition: '0.1s',
      '&:hover': {
        background: (theme: ThemeOptions) =>
          isDarkTheme(theme)
            ? lighten(theme.palette.background.paper, 0.1)
            : darken(theme.palette.background.paper, 0.1),
      },
      '&:active': {
        background: (theme: ThemeOptions) =>
          isDarkTheme(theme)
            ? lighten(theme.palette.background.paper, 0.2)
            : darken(theme.palette.background.paper, 0.2),
      },
    },
  },
}))

const App = (): React.ReactElement => {
  const storeTheme = useSelector((state) => state.settings.theme)
  const theme = createMuiTheme(storeTheme)
  const classes = useStyles(theme)

  // Set root classes
  document.body.className = classes.root

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <Router>
          {/** Restores user scroll */}
          <ScrollRestoration />

          {/** Change document title on routing */}
          <RouterTitleChange />

          <AppBar />
          <BottomBar />
          <div className={classes.app}>
            <AppRouter />
          </div>
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default React.memo(App)
