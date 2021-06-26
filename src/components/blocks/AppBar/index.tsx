import * as React from 'react'
import { useEffect } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import { useHistory, useLocation } from 'react-router-dom'
import { APP_BAR_HEIGHT, MAX_WIDTH, MIN_WIDTH, RATING_MODES } from 'src/config/constants'
import { Icon28SettingsOutline } from '@vkontakte/icons'
import { Icon24UserOutline } from '@vkontakte/icons'
import WifiOffRoundedIcon from '@material-ui/icons/WifiOffRounded'
import { Offline } from 'react-detect-offline'
import { useRoute, useSelector } from 'src/hooks'
import { FetchingState } from 'src/interfaces'
import { useDispatch } from 'react-redux'
import { getMe } from 'src/store/actions/user'
import { Divider, fade, Theme } from '@material-ui/core'
import useAppBarScrollTrigger from 'src/hooks/useAppBarScrollTrigger'
import isDarkTheme from 'src/utils/isDarkTheme'

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
  else
    return appBarColor ? appBarColor(theme) : theme.palette.background.paper
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: (props: StyleProps) =>
      makeAppBarBackgroundColor({ ...props, theme }),
    boxShadow: isDarkTheme(theme) ? '0 4px 12px 0 rgba(0, 0, 0, 0.06)' : '0 0 12px 0 rgba(0, 0, 0, 0.03)',
    [theme.breakpoints.up(MIN_WIDTH)]: {
      backgroundColor: theme.palette.background.paper + ' !important',
      boxShadow: 'none !important',
    },
    color: theme.palette.text.primary,
    position: 'fixed',
    height: APP_BAR_HEIGHT + 1,
    flexGrow: 1,
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
  dividerWrapperFullWidth: {
    width: '100%',
    display: 'none',
    [theme.breakpoints.up(MIN_WIDTH)]: {
      display: 'flex',
    },
  },
}))

const dividerStyle = { width: '100%' }

const AppBarComponent = () => {
  const trigger = useAppBarScrollTrigger()
  const history = useHistory()
  const location = useLocation()
  const route = useRoute()
  const shouldChangeColors = route.shouldAppBarChangeColors
  const appBarColor = route.appBarColor
  const isHidden = !route.shouldShowAppBar
  const classes = useStyles({
    isTransformed: trigger,
    appBarColor,
    shouldChangeColors,
  })
  const dispatch = useDispatch()
  const modeName = useSelector((state) => state.home.mode)
  const userState = useSelector((state) => state.user.profile.state)
  const userData = useSelector((state) => state.user.profile.data)
  const token = useSelector((state) => state.user.token)
  const mode = RATING_MODES.find((e) => e.mode === modeName)
  const shouldFetchUser = !!token
  const shouldShowUser = userState === FetchingState.Fetched

  const goHome = () => {
    window.scrollTo(0, 0)
    if (location.pathname !== `${mode?.to}/p/1`) {
      history.push(mode ? `${mode.to}/p/1` : '/')
    }
  }

  useEffect(() => {
    if (shouldFetchUser && !shouldShowUser) dispatch(getMe(token))
  }, [
    dispatch,
    token,
    shouldChangeColors,
    shouldFetchUser,
    shouldShowUser,
    isHidden,
    route,
  ])

  // Do not render the AppBar if it is hidden by the route
  if (isHidden) return null

  return (
    <>
      <AppBar className={classes.root} elevation={0}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.content}>
            <div className={classes.headerTitleWrapper}>
              <Typography
                onClick={() => goHome()}
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
            <IconButton
              onClick={() =>
                history.push('/settings', {
                  from: location.pathname + location.search,
                  scroll: window.pageYOffset,
                })
              }
            >
              <Icon28SettingsOutline width={24} height={24} />
            </IconButton>
            {!shouldShowUser && (
              <IconButton onClick={() => (token ? '' : history.push('/auth', {
                from: location.pathname + location.search,
                scroll: window.pageYOffset,
              }))}>
                <Icon24UserOutline width={24} height={24} />
              </IconButton>
            )}
            {shouldShowUser && (
              <IconButton
                onClick={() => history.push('/user/' + userData.login, {
                  from: location.pathname + location.search,
                  scroll: window.pageYOffset,
                })}
              >
                <Avatar className={classes.avatar} src={userData.avatar} />
              </IconButton>
            )}
          </div>
        </Toolbar>
        <div className={classes.dividerWrapperFullWidth}>
          <Divider style={dividerStyle} />
        </div>
      </AppBar>
    </>
  )
}

export default React.memo(AppBarComponent)
