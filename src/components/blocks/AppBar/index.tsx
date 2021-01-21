import * as React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import { Link, withRouter } from 'react-router-dom'
import { MIN_WIDTH, RATING_MODES } from 'src/config/constants'
import PermIdentityRoundedIcon from '@material-ui/icons/PermIdentityRounded'
import SearchRoundedIcon from '@material-ui/icons/SearchRounded'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined'
import WifiOffRoundedIcon from '@material-ui/icons/WifiOffRounded'
import { Offline } from 'react-detect-offline'
import { useSelector } from 'src/hooks'
import { FetchingState, UserExtended } from 'src/interfaces'
import { useDispatch } from 'react-redux'
import { getMe } from 'src/store/actions/user'
import { Divider } from '@material-ui/core'
import blend from 'src/utils/blendColors'
import MenuRoundedIcon from '@material-ui/icons/MenuRounded'
import Drawer from './Drawer'
import routes from 'src/config/routes'
import { match } from 'path-to-regexp'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: (progress) =>
      blend(
        theme.palette.background.default,
        theme.palette.background.paper,
        progress as number
      ),
    color: theme.palette.text.primary,
    position: 'fixed',
    height: 49,
    flexGrow: 1,
    transitionDuration: '0.5s',
  },
  toolbar: {
    margin: 'auto',
    minHeight: 'unset',
    height: 48,
    padding: 0,
    maxWidth: MIN_WIDTH,
    width: '100%',
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
    fontWeight: 800,
    height: '100%',
    alignItems: 'center',
    display: 'flex',
    fontFamily: 'Google Sans',
  },
  offline: {
    color: theme.palette.text.disabled,
    marginLeft: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
  },
  linkTypography: {
    flexGrow: 1,
    display: 'flex',
    height: '100%',
    alignItems: 'center',
  },
  menuIcon: {
    marginLeft: -12,
    color: theme.palette.text.primary,
  },
  avatar: {
    height: theme.spacing(3),
    width: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
  },
  marginContainer: {
    margin: theme.spacing(0, 2),
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'column',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
}))

const dividerStyle = { width: '100%' }

const AppBarComponent = ({ history }) => {
  const state = useSelector((state) => state.app.appbar)
  const [scrollProgress, setScrollProgress] = React.useState(
    state.shouldChangeColors ? Math.min(window.pageYOffset / 256, 1) : 1
  )
  const [isDrawerOpen, setDrawerOpen] = React.useState(false)
  const [isHidden, setHidden] = React.useState(false)
  const classes = useStyles(scrollProgress)
  const dispatch = useDispatch()
  const modeName = useSelector((state) => state.home.mode)
  const userState = useSelector((state) => state.user.profile.state)
  const userData = useSelector(
    (state) => state.user.profile.data
  ) as UserExtended
  const token = useSelector((state) => state.user.token)
  const mode = RATING_MODES.find((e) => e.mode === modeName)
  const shouldFetchUser = !!token
  const shouldShowUser = userState === FetchingState.Fetched
  const scrollCallback = () => {
    const position = window.pageYOffset
    const progress = Math.min(position / 256, 1)
    setScrollProgress(progress)
  }
  const hideAppBarHandler = (location: Location) => {
    const path = location.pathname
    const route = routes.find((e) => match(e.path)(path))

    if (!route.shouldShowAppBar) setHidden(true)
    else setHidden(false)
  }

  React.useEffect(() => {
    if (shouldFetchUser && !shouldShowUser) dispatch(getMe(token))
    if (state.shouldChangeColors && !isHidden)
      window.addEventListener('scroll', () => scrollCallback())
    return () => window.removeEventListener('scroll', scrollCallback)
  }, [dispatch, token, state, shouldFetchUser, shouldShowUser, isHidden])

  React.useEffect(() => {
    hideAppBarHandler(history.location)
    const unlisten = history.listen(hideAppBarHandler)
    return () => unlisten()
  }, [history])

  // Do not render the AppBar if it is hidden by the route
  if (isHidden) return null

  const MenuIcon = () => (
    <IconButton
      onClick={() => setDrawerOpen(true)}
      className={classes.menuIcon}
    >
      <MenuRoundedIcon />
    </IconButton>
  )
  const HeaderTitle = () => (
    <Typography variant="h6" className={classes.linkTypography}>
      <Link
        to={mode ? `${mode.to}/p/1` : '/'}
        onClick={() => window.scrollTo(0, 0)}
        className={classes.link}
      >
        habra.
        <Offline>
          <WifiOffRoundedIcon className={classes.offline} />
        </Offline>
      </Link>
    </Typography>
  )
  const SearchButton = () => (
    <IconButton onClick={() => history.push('/search')}>
      <SearchRoundedIcon />
    </IconButton>
  )
  const SettingsButton = () => (
    <IconButton onClick={() => history.push('/settings')}>
      <SettingsOutlinedIcon />
    </IconButton>
  )
  const UserButton = () => (
    <>
      {!shouldShowUser && (
        <IconButton onClick={() => (token ? '' : history.push('/auth'))}>
          <PermIdentityRoundedIcon />
        </IconButton>
      )}
      {shouldShowUser && (
        <IconButton onClick={() => history.push('/user/' + userData.login)}>
          <Avatar className={classes.avatar} src={userData.avatar} />
        </IconButton>
      )}
    </>
  )
  const AppBarDivider = () => <Divider style={dividerStyle} />

  return (
    <>
      <Drawer isOpen={isDrawerOpen} setOpen={setDrawerOpen} />
      <AppBar className={classes.root} elevation={0}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.marginContainer}>
            <div className={classes.content}>
              <MenuIcon />
              <HeaderTitle />
              <SearchButton />
              <SettingsButton />
              <UserButton />
            </div>
            <AppBarDivider />
          </div>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default React.memo(withRouter(AppBarComponent))
