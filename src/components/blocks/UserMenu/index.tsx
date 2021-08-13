import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles/'
import { Dialog, Fade, IconButton, Typography } from '@material-ui/core'
import { TransitionProps } from '@material-ui/core/transitions'
import { Icon24Cancel } from '@vkontakte/icons'
import UserAvatarAndLogin from './UserAvatarAndLogin'
import ManageAccountButton from './ManageAccountButton'
import KarmaStatistics from './KarmaStatistics'
import Links from './Links'

const DIALOG_MAX_WIDTH = 440

const useDialogStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    width: '100%',
    maxWidth: DIALOG_MAX_WIDTH,
    borderRadius: 12
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 48,
  },
  headerIcon: {
    marginRight: 4,
    zIndex: 2
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
  root: {},
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
          <Typography className={classesDialog.headerText}>
            Аккаунт
          </Typography>
        </div>
        <UserAvatarAndLogin handleClose={handleClose} />
        <ManageAccountButton />
        <KarmaStatistics />
        <Links />
      </Dialog>
    )
  else if (variant === 'modal') return <div className={classesModal.root}></div>
  else throw new Error('Unknown variant for UserMenu ("dialog" | "modal")')
}

export default React.memo(UserMenu)
