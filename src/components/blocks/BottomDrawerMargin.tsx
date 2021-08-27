import React, { Dispatch, SetStateAction } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { MIN_WIDTH } from '../../config/constants'
import { Drawer, fade, IconButton, SwipeableDrawer } from '@material-ui/core'
import { Icon24Cancel } from '@vkontakte/icons'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    color: '#fff',
  },
  drawerRoot: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: MIN_WIDTH,
    background: 'transparent',
    padding: theme.spacing(0, 1),
  },
  drawerContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  drawer: {
    borderRadius: '14px',
    margin: theme.spacing(1, 0),
    padding: theme.spacing(2),
    background: theme.palette.background.paper,
    border: '1px solid ' + fade(theme.palette.divider, 0.05),
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    height: 56,
  },
  drawerHeaderIcon: {
    marginRight: 4,
    marginLeft: -12,
  },
  drawerHeaderText: {
    fontFamily: 'Google Sans',
    fontSize: 20,
    fontWeight: 500,
    width: '100%',
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    zIndex: 1,
  },
  margin: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
}))

interface Props {
  children: NonNullable<React.ReactNode>
  isOpen: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

const BottomDrawerMargin = ({ children, isOpen, setOpen }: Props) => {
  const classes = useStyles()
  const contents = (
    <Container className={classes.drawer}>
      <div className={classes.drawerContent}>{children}</div>
    </Container>
  )

  return (
    <SwipeableDrawer
      open={isOpen}
      anchor="bottom"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      disableBackdropTransition
      disableDiscovery
      disableSwipeToOpen
      classes={{
        paper: classes.drawerRoot,
      }}
      className={classes.margin}
      style={{ zIndex: 5000 }}
      elevation={0}
    >
      {contents}
    </SwipeableDrawer>
  )
}

export default React.memo(BottomDrawerMargin)
