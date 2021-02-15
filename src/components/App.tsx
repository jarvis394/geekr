import * as React from 'react'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import { fade, makeStyles, ThemeOptions } from '@material-ui/core/styles/'
import AppRouter from './Router'
import AppBar from './blocks/AppBar'
import {
  APP_BAR_HEIGHT,
  BOTTOM_BAR_HEIGHT,
  chromeAddressBarHeight,
  MIN_WIDTH as minWidth,
} from '../config/constants'
import { lighten, darken } from '@material-ui/core/styles'
import isMobile from 'is-mobile'
import { useRoute, useSelector } from 'src/hooks'
import ScrollRestoration from 'react-scroll-restoration'
import RouterTitleChange from './RouterTitleChange'
import { SnackbarProvider } from 'notistack'
import BottomBar from './blocks/BottomBar'

interface StyleProps {
  theme: ThemeOptions
  shouldShowAppBar: boolean
}

const isDarkTheme = (t: ThemeOptions) => t.palette.type === 'dark'
const useStyles = makeStyles({
  app: {
    display: 'flex',
    minHeight: ({ shouldShowAppBar }: StyleProps) =>
      `calc(100vh - ${APP_BAR_HEIGHT}px - ${
        isMobile() ? chromeAddressBarHeight : 0
      }px - ${shouldShowAppBar ? BOTTOM_BAR_HEIGHT : 0}px)`,
    borderRadius: 0,
    flexDirection: 'column',
    maxWidth: minWidth,
    margin: ({ shouldShowAppBar }: StyleProps) =>
      `${APP_BAR_HEIGHT}px auto ${
        shouldShowAppBar ? BOTTOM_BAR_HEIGHT : 0
      }px auto`,
  },
  root: {
    /** Disable blue highlight for links. Can be bad for accessibility. */
    '& a': {
      '-webkit-tap-highlight-color': ({ theme }: StyleProps) =>
        fade(theme.palette.background.paper, 0.3),
    },
    backgroundColor: ({ theme }: StyleProps) =>
      theme.palette.background.default,
    color: ({ theme }: StyleProps) => theme.palette.text.primary,
    margin: 0,
    fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, Arial, sans-serif',
    lineHeight: 1.5,
    '&::-webkit-scrollbar': {
      width: 15,
      height: 10,
      background: ({ theme }: StyleProps) =>
        isDarkTheme(theme)
          ? lighten(theme.palette.background.default, 0.03)
          : theme.palette.background.paper,
      border: ({ theme }: StyleProps) =>
        '1px solid ' + darken(theme.palette.background.paper, 0.05),
    },
    '&::-webkit-scrollbar-thumb': {
      minHeight: 28,
      background: ({ theme }: StyleProps) =>
        isDarkTheme(theme)
          ? lighten(theme.palette.background.paper, 0.08)
          : darken(theme.palette.background.paper, 0.08),
      transition: '0.1s',
      '&:hover': {
        background: ({ theme }: StyleProps) =>
          isDarkTheme(theme)
            ? lighten(theme.palette.background.paper, 0.1)
            : darken(theme.palette.background.paper, 0.1),
      },
      '&:active': {
        background: ({ theme }: StyleProps) =>
          isDarkTheme(theme)
            ? lighten(theme.palette.background.paper, 0.2)
            : darken(theme.palette.background.paper, 0.2),
      },
    },
  },
})

const App = (): React.ReactElement => {
  const storeTheme = useSelector((state) => state.settings.theme)
  const theme = createMuiTheme(storeTheme)
  const route = useRoute()
  const classes = useStyles({
    theme,
    shouldShowAppBar: route?.shouldShowAppBar,
  })

  // Set root classes
  document.body.className = classes.root

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        {/** Restores user scroll */}
        <ScrollRestoration />

        {/** Change document title on routing */}
        <RouterTitleChange />

        <AppBar />
        <BottomBar />
        <div className={classes.app}>
          <AppRouter />
        </div>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default React.memo(App)
