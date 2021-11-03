import React, { useState } from 'react'
import {
  Avatar,
  ButtonBase,
  Divider,
  Drawer,
  Theme,
  Typography,
  useTheme,
} from '@material-ui/core'
import { makeStyles, fade } from '@material-ui/core/styles'
import {
  APP_BAR_HEIGHT,
  makeNavigationTabs,
  DRAWER_WIDTH,
  MIDDLE_WIDTH,
  RATING_MODES,
} from 'src/config/constants'
import TabObject from 'src/interfaces/NavigationTabObject'
import { useRoute, useSelector } from 'src/hooks'
import { useHistory, useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { Skeleton } from '@material-ui/lab'
import { Icon24DoorArrowLeftOutline } from '@vkontakte/icons'
import { Icon24InfoCircleOutline } from '@vkontakte/icons'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Route } from 'src/config/routes'
import { FetchingState } from 'src/interfaces'
import UserMenu from './UserMenu'
import RUVDSPromoBlock from './RUVDSPromo/Block'
import HalloweenPromoBlock from './HalloweenThemePromo/Block'

const NAVIGATION_TABS = makeNavigationTabs(28, 28, true)
const avatarWidth = 32
const avatarHeight = 32

const useStyles = makeStyles((theme) => ({
  drawer: {
    flexShrink: 0,
    display: 'flex',
    width: DRAWER_WIDTH,
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
    border: 'none',
  },
  drawerContainer: {
    overflow: 'auto',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    height: '100%',
  },
  logoHolder: {
    height: APP_BAR_HEIGHT + 1,
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    cursor: 'pointer',
    '-webkit-tap-highlight-color': fade(theme.palette.background.paper, 0.3),
    userSelect: 'none',
  },
  logo: {
    color: theme.palette.text.primary,
    fontWeight: 800,
    height: '100%',
    alignItems: 'center',
    display: 'flex',
    fontSize: 20,
    marginLeft: theme.spacing(2),
    fontFamily: 'Google Sans',
    position: 'relative',
  },
  logoDivider: {
    margin: theme.spacing(0, 2),
  },
  tabsHolder: {
    padding: theme.spacing(0, 2),
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(2),
    flexGrow: 1,
  },
  bottomBlock: {
    margin: theme.spacing(1, 0),
  },
  halloween_batIcon: {
    position: 'absolute',
    left: 48,
    top: 12,
    transform: 'rotate(30deg)',
    width: 24,
    height: 11.85,
    fill: '#eb4b2b !important',
  },
}))

const useNavButtonStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(1, 1.5, 1, 1.25),
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    color: theme.palette.text.secondary,
    '&:hover': {
      color: fade(theme.palette.text.primary, 0.75),
    },
  },
  icon: {
    color: theme.palette.primary.main,
  },
  match: {
    color: theme.palette.text.primary + ' !important',
    background: fade(theme.palette.text.primary, 0.1),
  },
  label: {
    transitionDuration: '0.1s',
    marginLeft: theme.spacing(2),
    fontSize: 16,
    fontWeight: 500,
    fontFamily: 'Google Sans',
  },
}))

const useProfileButtonStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    marginBottom: 0,
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(1, 1.2),
    textDecoration: 'none !important',
    background: fade(theme.palette.text.primary, 0.075),
    borderRadius: 8,
    transitionDuration: '100ms',
    transitionTimingFunction: theme.transitions.easing.easeIn,
    alignItems: 'center',
    '&:hover': {
      background: fade(theme.palette.text.primary, 0.1),
    },
  },
  avatar: {
    width: avatarWidth,
    height: avatarHeight,
    color: theme.palette.primary.main,
  },
  textHolder: {
    marginLeft: theme.spacing(1.5),
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    overflow: 'hidden',
  },
  fullname: {
    fontFamily: 'Google Sans',
    fontWeight: 'bold',
    fontSize: 16,
    color: theme.palette.text.primary,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%',
    textAlign: 'start',
  },
}))

const useAboutButtonStyles = makeStyles((theme) => ({
  rootWrapper: {
    margin: theme.spacing(0, 2),
  },
  root: {
    padding: theme.spacing(0.8, 1),
    borderRadius: 8,
    width: '100%',
    display: 'flex',
    alignItems: 'initial',
    flexDirection: 'column',
    textAlign: 'left',
    background: (s) => theme.palette.background[s ? 'paper' : 'default'],
    marginTop: theme.spacing(1),
  },
  text: {
    fontSize: 16,
    marginLeft: theme.spacing(1),
    fontWeight: 500,
    fontFamily: 'Google Sans',
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: theme.palette.text.secondary,
  },
  headerIcon: {
    marginRight: -8,
    width: 24,
    height: 24,
  },
}))

const isCurrent = (obj: TabObject, route: Route): boolean => {
  if (Array.isArray(obj.match)) {
    return obj.match.some((k) => k === route.alias)
  } else {
    return obj.match === route.alias
  }
}

interface NavButtonProps extends TabObject {
  current: boolean
}

const NavButton: React.FC<NavButtonProps> = ({ label, icon, to, current }) => {
  const classes = useNavButtonStyles()
  const history = useHistory()
  const handleClick = () => {
    const link = to()
    if (history.location.pathname !== link) {
      history.push(link)
    }
  }

  return (
    <ButtonBase
      className={classes.root + (current ? ' ' + classes.match : '')}
      onClick={() => handleClick()}
    >
      <div className={classes.icon}>{icon}</div>
      <Typography className={classes.label} component="span">
        {label}
      </Typography>
    </ButtonBase>
  )
}

const ProfileButton: React.FC = () => {
  const classes = useProfileButtonStyles()
  const [isUserMenuOpen, setUserMenuOpen] = useState(false)
  const userState = useSelector((state) => state.auth.me.state)
  const userData = useSelector((state) => state.auth.me.data)
  const csrfTokenState = useSelector((state) => state.auth.csrfToken.state)
  const shouldShowUser =
    userState === FetchingState.Fetched &&
    csrfTokenState === FetchingState.Fetched
  const shouldShowLoadingSpinner =
    csrfTokenState === FetchingState.Fetched &&
    userState !== FetchingState.Fetched
  const openUserMenu = () => setUserMenuOpen(true)

  if (shouldShowLoadingSpinner) {
    return (
      <div className={classes.root}>
        <div>
          <Skeleton variant="circle" className={classes.avatar} />
        </div>
        <div className={classes.textHolder}>
          <Skeleton width="75%"></Skeleton>
        </div>
      </div>
    )
  }

  return shouldShowUser ? (
    <>
      <ButtonBase className={classes.root} onClick={openUserMenu}>
        <Avatar className={classes.avatar} src={userData.avatarUrl} />
        <div className={classes.textHolder}>
          <Typography className={classes.fullname}>
            {userData.fullname}
          </Typography>
        </div>
      </ButtonBase>
      <UserMenu
        isOpen={isUserMenuOpen}
        setOpen={setUserMenuOpen}
        variant="modal"
      />
    </>
  ) : (
    <Link className={classes.root} to={'/auth'}>
      <Icon24DoorArrowLeftOutline
        className={classes.avatar}
        width={avatarWidth}
        height={avatarHeight}
      />
      <div className={classes.textHolder}>
        <Typography className={classes.fullname}>Войти</Typography>
      </div>
    </Link>
  )
}

const AboutButton = () => {
  const classes = useAboutButtonStyles()
  const history = useHistory()

  return (
    <div className={classes.rootWrapper}>
      <ButtonBase
        onClick={() =>
          history.push('/geekr-about', {
            from: location.pathname,
          })
        }
        className={classes.root}
      >
        <div className={classes.header}>
          <Icon24InfoCircleOutline width={24} height={24} />
          <Typography className={classes.text}>О сайте</Typography>
        </div>
      </ButtonBase>
    </div>
  )
}

const SideNavigationDrawer = () => {
  const theme = useTheme()
  const route = useRoute()
  const location = useLocation()
  const classes = useStyles()
  const modeName = useSelector((state) => state.home.mode)
  const mode = RATING_MODES.find((e) => e.mode === modeName)
  const history = useHistory()
  // future: https://material-ui.com/components/use-media-query/#server-side-rendering
  // when ssr is implemented, change `noSsr` to false.
  const shouldShowDrawer = useMediaQuery(theme.breakpoints.up(MIDDLE_WIDTH), {
    noSsr: true,
  })

  // Do not render drawer on mobile and tablet
  if (!shouldShowDrawer) return null

  const goHome = () => {
    window.scrollTo(0, 0)
    if (location.pathname !== `${mode?.to}/p/1`) {
      history.push(mode ? `${mode.to}p/1` : '/')
    }
  }

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerContainer}>
        <div className={classes.logoHolder} onClick={goHome}>
          <Typography variant="h6" className={classes.logo}>
            geekr.
          </Typography>
          <Divider className={classes.logoDivider} />
        </div>
        <ProfileButton />
        <div className={classes.tabsHolder}>
          {NAVIGATION_TABS.map((e, i) => (
            <NavButton current={isCurrent(e, route)} key={i} {...e} />
          ))}
        </div>
        <div className={classes.bottomBlock}>
          <RUVDSPromoBlock />
          <Divider className={classes.logoDivider} />
          <AboutButton />
        </div>
      </div>
    </Drawer>
  )
}

export default SideNavigationDrawer
