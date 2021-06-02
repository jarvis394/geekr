import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Step,
  StepLabel,
  Stepper,
  Divider,
  Typography,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderRadius: 8
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Google Sans',
    fontSize: 36,
    fontWeight: 800,
  },
  actions: {
    padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
    justifyContent: 'space-between',
  },
  button: {},
  centered: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    flexDirection: 'column',
  },
}))

const StartupDialog = () => {
  const [open, setOpen] = useState(true)
  const classes = useStyles()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const handleClose = () => setOpen(false)

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      classes={{
        paper: classes.root
      }}
    >
    </Dialog>
  )
}

export default StartupDialog
