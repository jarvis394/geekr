import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { MIDDLE_WIDTH, MIN_WIDTH } from '../../config/constants'
import {
  Dialog,
  Drawer,
  IconButton,
  SwipeableDrawer,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
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
    margin: theme.spacing(0, 2, 2, 2),
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
    width: 'calc(100% - 56px - 56px)',
    textAlign: 'center',
    position: 'absolute',
    left: 56,
    zIndex: 1,
    right: 56,
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
  setOpen?: (value: boolean) => void
  disableClose?: boolean
  hideOnDesktop?: boolean
}

const BottomDrawer = ({
  headerText,
  children,
  isOpen,
  setOpen,
  disableClose,
  hideOnDesktop = false,
}: Props) => {
  const classes = useStyles()
  const theme = useTheme()
  // future: https://material-ui.com/components/use-media-query/#server-side-rendering
  // when ssr is implemented, change `noSsr` to false.
  const query = useMediaQuery(theme.breakpoints.up(MIDDLE_WIDTH), {
    noSsr: true,
  })
  const open = () => setOpen(true)
  const close = () => setOpen(false)
  const contents = (
    <div className={classes.drawer}>
      <div className={classes.drawerHeader}>
        {!disableClose && (
          <IconButton className={classes.drawerHeaderIcon} onClick={close}>
            <Icon24Cancel />
          </IconButton>
        )}
        <Typography className={classes.drawerHeaderText}>
          {headerText}
        </Typography>
      </div>
      <div className={classes.drawerContent}>{children}</div>
    </div>
  )

  return disableClose ? (
    <Drawer
      open={isOpen}
      anchor="bottom"
      classes={{
        paper: classes.drawerRoot,
      }}
      className={classes.margin}
      style={{ zIndex: 5000 }}
      elevation={0}
    >
      {contents}
    </Drawer>
  ) : (
    <>
      {!query && (
        <SwipeableDrawer
          open={isOpen}
          anchor="bottom"
          onClose={close}
          onOpen={open}
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
      )}
      {query && !hideOnDesktop && (
        <Dialog onClose={close} open={isOpen}>
          {contents}
        </Dialog>
      )}
    </>
  )
}

export default React.memo(BottomDrawer)
