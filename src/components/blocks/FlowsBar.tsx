import React from 'react'
import { darken, Toolbar, AppBar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  MIN_WIDTH,
  MAX_WIDTH,
  APP_BAR_HEIGHT,
  FLOWS as flows,
  DRAWER_WIDTH,
  MIDDLE_WIDTH,
} from 'src/config/constants'
import isDarkTheme from 'src/utils/isDarkTheme'
import { Link } from 'react-router-dom'
import getSecondaryAppBarColor from 'src/utils/getSecondaryAppBarColor'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: getSecondaryAppBarColor(theme),
    color: theme.palette.text.primary,
    position: 'absolute',
    height: APP_BAR_HEIGHT,
    top: APP_BAR_HEIGHT,
    flexGrow: 1,
    zIndex: theme.zIndex.appBar,
    willChange: 'transform',
    [theme.breakpoints.up(MIN_WIDTH)]: {
      position: 'fixed',
      top: 0
    },
    [theme.breakpoints.up(MIDDLE_WIDTH)]: {
      paddingLeft: DRAWER_WIDTH,
    },
  },
  toolbar: {
    minHeight: 'unset',
    height: APP_BAR_HEIGHT,
    padding: 0,
    maxWidth: MAX_WIDTH,
    width: '100%',
    flexDirection: 'column',
  },
  content: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    overflow: 'auto',
  },
  link: {
    '&:first-child': {
      marginLeft: theme.spacing(1),
    },
    '&:last-child': {
      paddingRight: theme.spacing(2),
    },
    flexShrink: 0,
    textDecoration: 'none',
    fontWeight: 700,
    fontFamily: 'Google Sans',
    fontSize: 15,
    color: theme.palette.text.secondary,
    transitionDuration: theme.transitions.duration.shortest + 'ms',
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}))

const FlowsBar = () => {
  const classes = useStyles()

  return (
    <AppBar className={classes.root} elevation={0}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.content}>
          {flows.map((e, i) => (
            <Link className={classes.link} key={i} to={e.link}>
              {e.title}
            </Link>
          ))}
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default FlowsBar
