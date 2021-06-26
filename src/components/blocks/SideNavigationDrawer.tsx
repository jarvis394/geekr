import React from 'react'
import { ButtonBase, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  APP_BAR_HEIGHT,
  makeNavigationTabs,
  DRAWER_WIDTH,
  MIN_WIDTH,
} from 'src/config/constants'
import TabObject from 'src/interfaces/NavigationTabObject'
import { useRoute } from 'src/hooks'
import { useHistory, useLocation } from 'react-router'

const NAVIGATION_TABS = makeNavigationTabs(28, 28)

const useStyles = makeStyles<Theme, { match: boolean }>((theme) => ({
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
    marginRight: theme.spacing(1.5),
    position: 'sticky',
    top: APP_BAR_HEIGHT + 1 + theme.spacing(1.5),
    marginTop: ({ match }) => (match ? APP_BAR_HEIGHT + theme.spacing(1.5) : 0),
    display: 'none',
    [theme.breakpoints.up(MIN_WIDTH)]: {
      display: 'flex',
    },
  },
  drawerContainer: {
    overflow: 'auto',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
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
  },
  icon: {
    color: theme.palette.primary.main,
  },
  match: {
    color: theme.palette.text.primary + ' !important',
  },
  label: {
    transitionDuration: '0.1s',
    marginLeft: theme.spacing(1),
    fontSize: 15,
    fontWeight: 500,
    color: theme.palette.text.secondary,
    fontFamily: 'Google Sans',
  },
}))

const isCurrent = (obj: TabObject, pathname: string): boolean => {
  return !!pathname.match(obj.match)
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
    <ButtonBase className={classes.root} onClick={() => handleClick()}>
      <div className={classes.icon}>{icon}</div>
      <Typography
        className={classes.label + (current ? ' ' + classes.match : '')}
        component="span"
      >
        {label}
      </Typography>
    </ButtonBase>
  )
}

const SideNavigationDrawer = () => {
  const route = useRoute()
  const location = useLocation()
  const match = route.alias === 'feed'
  const classes = useStyles({ match })

  return (
    <div className={classes.drawer}>
      <div className={classes.drawerContainer}>
        {NAVIGATION_TABS.map((e, i) => (
          <NavButton current={isCurrent(e, location.pathname)} key={i} {...e} />
        ))}
      </div>
    </div>
  )
}

export default SideNavigationDrawer
