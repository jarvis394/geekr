import React, { Dispatch, SetStateAction } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { MIN_WIDTH } from '../../config/constants'
import { IconButton, SwipeableDrawer } from '@material-ui/core'
import { Icon24Cancel } from '@vkontakte/icons'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    color: '#fff',
  },
  drawerRoot: {
    WebkitBorderTopLeftRadius: '14px',
    WebkitBorderTopRightRadius: '14px',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: MIN_WIDTH,
  },
  drawerContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  drawer: {
    margin: theme.spacing(0, 0, 2, 0),
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
    zIndex: -1,
  },
  margin: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
}))

interface Props {
  headerText: string
  children: NonNullable<React.ReactNode>
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const BottomDrawer = ({ headerText, children, isOpen, setOpen }: Props) => {
  const classes = useStyles()

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
      <Container className={classes.drawer}>
        <div className={classes.drawerHeader}>
          <IconButton
            className={classes.drawerHeaderIcon}
            onClick={() => setOpen(false)}
          >
            <Icon24Cancel />
          </IconButton>
          <Typography className={classes.drawerHeaderText}>
            {headerText}
          </Typography>
        </div>
        <div className={classes.drawerContent}>{children}</div>
      </Container>
    </SwipeableDrawer>
  )
}

export default React.memo(BottomDrawer)
