import * as React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import { Link } from 'react-router-dom'
import { MIN_WIDTH, RATING_MODES } from '../../config/constants'
import PermIdentityRoundedIcon from '@material-ui/icons/PermIdentityRounded'
import SearchRoundedIcon from '@material-ui/icons/SearchRounded'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined'
import { useHistory } from 'react-router-dom'
import WifiOffRoundedIcon from '@material-ui/icons/WifiOffRounded'
import { Offline } from 'react-detect-offline'
import { useSelector } from 'src/hooks'
import { FetchingState, UserExtended } from 'src/interfaces'
import { useDispatch } from 'react-redux'
import { getMe } from 'src/store/actions/user'
import { Divider } from '@material-ui/core'
import blend from 'src/utils/blendColors'

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

const AppBarComponent = () => {
  const state = useSelector((state) => state.app.appbar)
  const [scrollProgress, setScrollProgress] = React.useState(
    state.shouldChangeColors ? Math.min(window.pageYOffset / 48, 1) : 1
  )
  const classes = useStyles(scrollProgress)
  const dispatch = useDispatch()
  const history = useHistory()
  const modeName = useSelector((state) => state.home.mode)
  const userState = useSelector((state) => state.user.profile.state)
  const userData = useSelector(
    (state) => state.user.profile.data
  ) as UserExtended
  const token = useSelector((state) => state.user.token)
  const mode = RATING_MODES.find((e) => e.mode === modeName)
  const shouldFetchUser = !!token
  const shouldShowUser = userState === FetchingState.Fetched

  React.useEffect(() => {
    const scrollCallback = () => {
      const position = window.pageYOffset
      const progress = Math.min(position / 48, 1)
      setScrollProgress(progress)
    }

    if (shouldFetchUser && !shouldShowUser) dispatch(getMe(token))
    state.shouldChangeColors &&
      window.addEventListener('scroll', () => scrollCallback())
    return () => window.removeEventListener('scroll', scrollCallback)
  }, [dispatch, token, state, shouldFetchUser, shouldShowUser])

  if (state.isHidden) return null

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
    <AppBar className={classes.root} elevation={0}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.marginContainer}>
          <div className={classes.content}>
            <HeaderTitle />
            <SearchButton />
            <SettingsButton />
            <UserButton />
          </div>
          <AppBarDivider />
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default React.memo(AppBarComponent)
