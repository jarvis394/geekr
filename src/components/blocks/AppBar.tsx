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
import {
  ButtonBase,
  Divider,
  Fade,
  fade,
  Grid,
  SwipeableDrawer,
} from '@material-ui/core'
import blend from 'src/utils/blendColors'
import MenuRoundedIcon from '@material-ui/icons/MenuRounded'
import DeviceHubRoundedIcon from '@material-ui/icons/DeviceHubRounded'
import SubscriptionsRoundedIcon from '@material-ui/icons/SubscriptionsRounded'
import CodeRoundedIcon from '@material-ui/icons/CodeRounded'
import SupervisorAccountRoundedIcon from '@material-ui/icons/SupervisorAccountRounded'
import BrushRoundedIcon from '@material-ui/icons/BrushRounded'
import StorageRoundedIcon from '@material-ui/icons/StorageRounded'
import LiveTvRoundedIcon from '@material-ui/icons/LiveTvRounded'
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded'

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
  drawerPaper: {
    background: theme.palette.background.default,
    maxWidth: '75%',
  },
  drawerRoot: {
    height: '100%',
    background: `linear-gradient(to right, ${fade(
      theme.palette.background.default,
      0.4
    )}, transparent)`,
  },
  drawerFlowsTitle: {
    fontFamily: 'Google Sans',
    fontWeight: 800,
    fontSize: 20,
    height: 48,
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing(2),
  },
  drawerBackdrop: {
    background: fade(theme.palette.background.default, 0.7),
  },
  drawerFlowsGrid: {
    padding: theme.spacing(0.5),
    width: '100%',
    margin: 0,
  },
  flowCard: {
    width: '100%',
    height: 48,
    borderRadius: 8,
    background: theme.palette.background.paper,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2),
    flexDirection: 'column',
    alignItems: 'baseline',
  },
  flowCardTitle: {
    fontFamily: 'Google Sans',
    fontSize: 18,
    fontWeight: 800,
    color: fade(theme.palette.text.primary, 0.7),
  },
  flowCardIcon: {
    position: 'absolute',
    top: 2,
    right: 4,
    opacity: 0.1,
    borderRadius: 8,
    '& svg': { fontSize: '4rem' },
  },
}))

const dividerStyle = { width: '100%' }
const flows = [
  { title: 'Все потоки', icon: <DeviceHubRoundedIcon /> },
  { title: 'Моя лента', icon: <SubscriptionsRoundedIcon /> },
  { title: 'Разработка', icon: <CodeRoundedIcon /> },
  { title: 'Администрирование', icon: <StorageRoundedIcon /> },
  { title: 'Дизайн', icon: <BrushRoundedIcon /> },
  { title: 'Менеджмент', icon: <SupervisorAccountRoundedIcon /> },
  { title: 'Маркетинг', icon: <LiveTvRoundedIcon /> },
  { title: 'Научпоп', icon: <MenuBookRoundedIcon /> },
]

const FlowCard = ({ title, icon }) => {
  const classes = useStyles()
  return (
    <ButtonBase className={classes.flowCard}>
      <div className={classes.flowCardIcon}>{icon}</div>
      <Typography className={classes.flowCardTitle}>{title}</Typography>
    </ButtonBase>
  )
}

const Drawer = ({ isOpen, setOpen }) => {
  const classes = useStyles()
  return (
    <SwipeableDrawer
      anchor={'left'}
      open={isOpen}
      BackdropProps={{
        classes: { root: classes.drawerBackdrop },
      }}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      disableDiscovery
      disableSwipeToOpen
      disableBackdropTransition
      PaperProps={{
        style: {},
      }}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Fade in={isOpen}>
        <div className={classes.drawerRoot}>
          <Typography className={classes.drawerFlowsTitle}>Потоки</Typography>
          <Grid container spacing={1} className={classes.drawerFlowsGrid}>
            {flows.map((e, i) => (
              <Grid item key={i} xs={12} sm={12} md={3}>
                <FlowCard title={e.title} icon={e.icon} />
              </Grid>
            ))}
          </Grid>
        </div>
      </Fade>
    </SwipeableDrawer>
  )
}

const AppBarComponent = () => {
  const state = useSelector((state) => state.app.appbar)
  const [scrollProgress, setScrollProgress] = React.useState(
    state.shouldChangeColors ? Math.min(window.pageYOffset / 48, 1) : 1
  )
  const [isDrawerOpen, setDrawerOpen] = React.useState(false)
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

export default React.memo(AppBarComponent)
