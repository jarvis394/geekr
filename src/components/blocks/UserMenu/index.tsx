import React from 'react'
import { makeStyles, lighten } from '@material-ui/core/styles/'
import {
  ClickAwayListener,
  Dialog,
  Fade,
  IconButton,
  Paper,
  Portal,
  Typography,
} from '@material-ui/core'
import { TransitionProps } from '@material-ui/core/transitions'
import { Icon24Cancel } from '@vkontakte/icons'
import UserAvatarAndLogin from './UserAvatarAndLogin'
import ManageAccountButton from './ManageAccountButton'
import KarmaStatistics from './KarmaStatistics'
import Links from './Links'
import { APP_BAR_HEIGHT, DRAWER_WIDTH } from 'src/config/constants'
import isDarkTheme from 'src/utils/isDarkTheme'

const DIALOG_MAX_WIDTH = 440
const MODAL_MAX_WIDTH = 300

const useDialogStyles = makeStyles(() => ({
  paper: {
    display: 'flex',
    width: '100%',
    maxWidth: DIALOG_MAX_WIDTH,
    borderRadius: 12,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 48,
  },
  headerIcon: {
    marginRight: 4,
    zIndex: 2,
  },
  headerText: {
    fontFamily: 'Google Sans',
    fontSize: 20,
    fontWeight: 500,
    width: '100%',
    textAlign: 'center',
    position: 'absolute',
    zIndex: 1,
  },
}))
const useModalStyles = makeStyles((theme) => ({
  root: {
    background: isDarkTheme(theme)
      ? lighten(theme.palette.background.paper, 0.05)
      : theme.palette.background.paper,
    display: 'flex',
    width: '100%',
    maxWidth: MODAL_MAX_WIDTH,
    borderRadius: 8,
    flexDirection: 'column',
    zIndex: theme.zIndex.modal,
    position: 'fixed',
    paddingTop: theme.spacing(1),
    top: `calc(${APP_BAR_HEIGHT}px + ${theme.spacing(1.5)}px)`,
    left: `calc(${DRAWER_WIDTH}px + ${theme.spacing(2)}px)`,
    boxShadow:
      '0px 3px 5px -1px rgb(0 0 0 / 12%), 0px 6px 10px 0px rgb(0 0 0 / 7%), 0px 1px 18px 0px rgb(0 0 0 / 4%) !important',
  },
}))

interface Props {
  isOpen: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  variant: 'dialog' | 'modal'
}

const Transition = React.forwardRef(function Transition(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const UserMenu: React.FC<Props> = ({ isOpen, setOpen, variant }) => {
  const classesDialog = useDialogStyles()
  const classesModal = useModalStyles()
  const handleClose = () => setOpen(false)

  if (variant === 'dialog')
    return (
      <Dialog
        onClose={handleClose}
        open={isOpen}
        TransitionComponent={Transition}
        classes={{ paper: classesDialog.paper }}
      >
        <div className={classesDialog.header}>
          <IconButton
            className={classesDialog.headerIcon}
            onClick={handleClose}
          >
            <Icon24Cancel />
          </IconButton>
          <Typography className={classesDialog.headerText}>Аккаунт</Typography>
        </div>
        <UserAvatarAndLogin handleClose={handleClose} />
        <ManageAccountButton />
        <KarmaStatistics />
        <Links />
      </Dialog>
    )
  else if (variant === 'modal')
    return isOpen ? (
      <Portal>
        <ClickAwayListener onClickAway={handleClose}>
          <div>
            <Paper className={classesModal.root}>
              <UserAvatarAndLogin handleClose={handleClose} />
              <ManageAccountButton />
              <KarmaStatistics />
              <Links />
            </Paper>
          </div>
        </ClickAwayListener>
      </Portal>
    ) : null
  else throw new Error('Unknown variant for UserMenu ("dialog" | "modal")')
}

export default React.memo(UserMenu)
