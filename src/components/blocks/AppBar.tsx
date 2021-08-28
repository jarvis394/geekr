import * as React from 'react'
import { useEffect } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import { useHistory, useLocation } from 'react-router-dom'
import {
  APP_BAR_HEIGHT,
  MAX_WIDTH,
  MIDDLE_WIDTH,
  RATING_MODES,
} from 'src/config/constants'
import { Icon28SettingsOutline } from '@vkontakte/icons'
import { Icon24UserOutline } from '@vkontakte/icons'
import WifiOffRoundedIcon from '@material-ui/icons/WifiOffRounded'
import { Offline } from 'react-detect-offline'
import { useRoute, useSelector } from 'src/hooks'
import { FetchingState } from 'src/interfaces'
import {
  CircularProgress,
  fade,
  Theme,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import useAppBarScrollTrigger from 'src/hooks/useAppBarScrollTrigger'
import UserMenu from './UserMenu'

interface StyleProps {
  isTransformed: boolean
  appBarColor: (theme: Theme) => string
  shouldChangeColors: boolean
}

const makeAppBarBackgroundColor = ({
  isTransformed,
  appBarColor,
  shouldChangeColors,
  theme,
}) => {
  if (shouldChangeColors)
    return theme.palette.background[isTransformed ? 'paper' : 'default']
  else return appBarColor ? appBarColor(theme) : theme.palette.background.paper
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: (props: StyleProps) =>
      makeAppBarBackgroundColor({ ...props, theme }),
    [theme.breakpoints.up(MIDDLE_WIDTH)]: {
      display: 'none',
    },
    color: theme.palette.text.primary,
    position: 'fixed',
    height: APP_BAR_HEIGHT + 1,
    flexGrow: 1,
    zIndex: theme.zIndex.appBar + 1,
    willChange: 'transform',
  },
  toolbar: {
    margin: 'auto',
    minHeight: 'unset',
    height: APP_BAR_HEIGHT,
    padding: 0,
    maxWidth: MAX_WIDTH,
    width: '100%',
    flexDirection: 'column',
  },
  headerTitle: {
    color: theme.palette.text.primary,
    fontWeight: 800,
    height: '100%',
    alignItems: 'center',
    display: 'flex',
    fontFamily: 'Google Sans',
    cursor: 'pointer',
    '-webkit-tap-highlight-color': fade(theme.palette.background.paper, 0.3),
    userSelect: 'none',
  },
  headerTitleWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
  },
  offline: {
    color: theme.palette.text.disabled,
    marginLeft: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    height: theme.spacing(3),
    width: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    width: `calc(100% - ${theme.spacing(2) * 2}px)`,
  },
}))

const AppBarComponent = () => {
  const trigger = useAppBarScrollTrigger()
  const history = useHistory()
  const location = useLocation()
  const route = useRoute()
  const shouldChangeColors = route.shouldAppBarChangeColors
  const appBarColor = route.appBarColor
  const isHidden = !route.shouldShowAppBar
  const theme = useTheme()
  const appHasDrawer = useMediaQuery(theme.breakpoints.up(MIDDLE_WIDTH))
  const [isUserMenuOpen, setUserMenuOpen] = React.useState(false)
  const classes = useStyles({
    isTransformed: trigger,
    appBarColor,
    shouldChangeColors,
  })
  const modeName = useSelector((state) => state.home.mode)
  const userState = useSelector((state) => state.auth.me.state)
  const userData = useSelector((state) => state.auth.me.data)
  const csrfTokenState = useSelector((state) => state.auth.csrfToken.state)
  const mode = RATING_MODES.find((e) => e.mode === modeName)
  const shouldShowUser =
    userState === FetchingState.Fetched &&
    csrfTokenState === FetchingState.Fetched
  const shouldShowLoadingSpinner =
    csrfTokenState === FetchingState.Fetched &&
    userState !== FetchingState.Fetched

  const goHome = () => {
    window.scrollTo(0, 0)
    if (location.pathname !== `${mode?.to}/p/1`) {
      history.push(mode ? `${mode.to}/p/1` : '/')
    }
  }
  const goSettings = () =>
    history.push('/settings', {
      from: location.pathname + location.search,
      scroll: window.pageYOffset,
    })
  const goAuth = () =>
    history.push('/auth', {
      from: location.pathname + location.search,
      scroll: window.pageYOffset,
    })
  const openUserMenu = () => setUserMenuOpen(true)

  useEffect(() => {
    if (appHasDrawer && isUserMenuOpen) setUserMenuOpen(false)
  }, [shouldChangeColors, isHidden, route, appHasDrawer])

  // Do not render the AppBar if it is hidden by the route
  if (isHidden) return null

  return (
    <>
      <AppBar className={classes.root} elevation={0}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.content}>
            <div className={classes.headerTitleWrapper}>
              <Typography
                onClick={goHome}
                variant="h6"
                className={classes.headerTitle}
              >
                habra.
              </Typography>
              <Offline
                polling={{
                  url: 'https://ipv4.icanhazip.com',
                }}
              >
                <WifiOffRoundedIcon className={classes.offline} />
              </Offline>
            </div>
            <IconButton onClick={goSettings}>
              <Icon28SettingsOutline width={24} height={24} />
            </IconButton>
            {shouldShowLoadingSpinner && (
              <IconButton style={{ width: 48, height: 48 }}>
                <CircularProgress
                  style={{ width: 16, height: 16 }}
                  color="primary"
                />
              </IconButton>
            )}
            {!shouldShowUser && !shouldShowLoadingSpinner && (
              <IconButton onClick={goAuth}>
                <Icon24UserOutline width={24} height={24} />
              </IconButton>
            )}
            {shouldShowUser && (
              <IconButton onClick={openUserMenu}>
                <Avatar className={classes.avatar} src={userData.avatarUrl} />
              </IconButton>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <UserMenu
        variant="dialog"
        isOpen={isUserMenuOpen}
        setOpen={setUserMenuOpen}
      />
    </>
  )
}

export default React.memo(AppBarComponent)
