import React from 'react'
import { darken, Toolbar, AppBar, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { MIN_WIDTH, MAX_WIDTH, APP_BAR_HEIGHT, FLOWS as flows } from 'src/config/constants'
import isDarkTheme from 'src/utils/isDarkTheme'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: darken(
      theme.palette.background.paper,
      isDarkTheme(theme) ? 0.25 : 0.003
    ),
    color: theme.palette.text.primary,
    position: 'absolute',
    height: APP_BAR_HEIGHT + 1,
    top: APP_BAR_HEIGHT + 1,
    flexGrow: 1,
    zIndex: 0,
    willChange: 'transform',
    transition: 'all 0.1s ' + theme.transitions.easing['easeOut'],
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
  content: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    overflow: 'auto'
  },
  dividerWrapperFullWidth: {
    width: '100%',
    display: 'none',
    [theme.breakpoints.up(MIN_WIDTH)]: {
      display: 'flex',
    },
  },
  divider: {
    width: '100%',
  },
  link: {
    '&:first-child': {
      marginLeft: theme.spacing(1)
    },
    '&:last-child': {
      paddingRight: theme.spacing(2)
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
      color: theme.palette.primary.main
    }
  }
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
      <div className={classes.dividerWrapperFullWidth}>
        <Divider className={classes.divider} />
      </div>
    </AppBar>
  )
}

export default FlowsBar
