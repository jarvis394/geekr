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
  root: {},
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

const LanguagePage = () => {
  const classes = useStyles()
  const [value, setValue] = useState<'russian' | 'english'>()
  const handleChange = (event) => setValue(event.target.value)

  return (
    <div className={classes.centered}>
      <Typography className={classes.title}>Привет!</Typography>

      <Typography>
        Привет! Ты можешь выбрать язык, на котором будет приложение.
      </Typography>

      {/* <FormControl component="fieldset">
          <RadioGroup name="language" value={value} onChange={handleChange}>
            <FormControlLabel
              value="russian"
              control={<Radio color="primary" />}
              label="Русский"
            />
            <FormControlLabel
              value="english"
              control={<Radio color="primary" />}
              label="English"
            />
          </RadioGroup>
        </FormControl> */}
    </div>
  )
}

const getSteps = () => {
  return [<LanguagePage key={0} />, <LanguagePage key={1} />]
}

const getLabels = () => {
  return ['Язык', 'Тема']
}

const StartupDialog = () => {
  const [activeStep, setActiveStep] = useState(0)
  const steps = getSteps()
  const labels = getLabels()
  const handleStepChoose = (event) =>
    setActiveStep((prevActiveStep) => {
      console.log(event.target.value)
      return prevActiveStep + 1
    })

  const [open, setOpen] = useState(true)
  const classes = useStyles()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const handleClose = () => setOpen(false)

  return (
    <Dialog
      className={classes.root}
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
    >
      {steps[activeStep]}
    </Dialog>
  )
}

export default StartupDialog
