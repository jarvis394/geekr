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

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: (trigger) =>
      theme.palette.background[trigger ? 'paper' : 'default'],
    color: theme.palette.text.primary,
    position: 'fixed',
    height: 48,
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
    borderBottom: '1px solid ' + theme.palette.divider,
  },
}))

interface HideOnScrollProps {
  children: React.ReactElement
}

const Component = () => {
  const [trigger, setTrigger] = React.useState(false)
  const classes = useStyles(trigger)
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
      const state = position > 48
      trigger !== state && setTrigger(state)
    }

    if (shouldFetchUser && !shouldShowUser) dispatch(getMe(token))
    window.addEventListener('scroll', () => scrollCallback())
    return window.removeEventListener('scroll', scrollCallback)
  }, [shouldFetchUser, dispatch, token, trigger])

  return (
    <AppBar className={classes.root} elevation={0}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.marginContainer}>
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
          <IconButton onClick={() => history.push('/search')}>
            <SearchRoundedIcon />
          </IconButton>
          <IconButton onClick={() => history.push('/settings')}>
            <SettingsOutlinedIcon />
          </IconButton>
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
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default React.memo(Component)
