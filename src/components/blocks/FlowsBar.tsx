import React from 'react'
import { Toolbar, AppBar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  MAX_WIDTH,
  APP_BAR_HEIGHT,
  FLOWS,
  DRAWER_WIDTH,
  MIDDLE_WIDTH,
} from 'src/config/constants'
import getSecondaryAppBarColor from 'src/utils/getSecondaryAppBarColor'
import { FlowAlias, FlowObject } from 'src/interfaces'
import { useSelector } from 'src/hooks'

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
    [theme.breakpoints.up(MIDDLE_WIDTH)]: {
      paddingLeft: DRAWER_WIDTH,
      position: 'fixed',
      top: 0,
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
    cursor: 'pointer',
    userSelect: 'none',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  selected: {
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.palette.text.primary,
    },
  },
}))

const FlowsBar: React.FC<{
  flow: FlowAlias
  onClick: (e: FlowObject) => void
}> = ({ flow, onClick }) => {
  const classes = useStyles()
  const isLoggedIn = useSelector((store) => !!store.auth.authorizedRequestData)
  const FlowItem: React.FC<{ data: FlowObject }> = ({ data }) => (
    <a
      className={[classes.link]
        .concat(flow == data.alias ? [classes.selected] : [])
        .join(' ')}
      onClick={() => onClick(data)}
    >
      {data.title}
    </a>
  )

  return (
    <AppBar className={classes.root} elevation={0}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.content}>
          {isLoggedIn && (
            <FlowItem
              data={{
                title: 'Моя лента',
                alias: 'feed',
              }}
            />
          )}
          {FLOWS.map((e, i) => (
            <FlowItem key={i} data={e} />
          ))}
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default FlowsBar
