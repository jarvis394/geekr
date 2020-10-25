import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useTheme, fade, makeStyles } from '@material-ui/core/styles'
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
  Backdrop,
  Container,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.drawer + 1,
    textAlign: 'center',
    backgroundColor: fade(theme.palette.background.default, 0.9),
    overflowY: 'auto',
    overflowX: 'hidden',
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

const LanguagePage = ({ handle }) => {
  const classes = useStyles()
  const [value, setValue] = useState<'russian' | 'english'>()

  return (
    <div className={classes.centered}>
      <Typography className={classes.title}>Привет!</Typography>

      <Typography>
        Привет! Ты можешь выбрать язык, на котором будет приложение.
      </Typography>
      <Button onClick={() => handle((prev) => prev + 1)}>adsdadsds</Button>

      {/* <FormControl component="fieldset">
          <RadioGroup name="language" value={value} onChange={handleChange}>
            <FormControlLabel
              value="russian"
              control={<Radio color="p  rimary" />}
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

const StartupDialog = () => {
  const [activeStep, setActiveStep] = useState(0)

  const getSteps = () => {
    return [<LanguagePage key={0} handle={setActiveStep} />, <LanguagePage key={1} handle={setActiveStep} />]
  }
  
  const getLabels = () => {
    return ['Язык', 'Тема']
  }

  const steps = getSteps()
  const labels = getLabels()
  const [open, setOpen] = useState(true)
  const classes = useStyles()
  const theme = useTheme()

  if (activeStep >= steps.length && open) setOpen(false)

  // Ignoring that document.body.style is read-only. Nah...
  if (open) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    document.body.style = 'overflow: hidden;'
  } else {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    document.body.style = ''
  }

  return (
    <Backdrop transitionDuration={{ enter: 0, exit: 2000 }} className={classes.root} open={open}>
      <Container>
        {/** Render active step */}
        {steps[activeStep]}
      </Container>
    </Backdrop>
  )
}

export default StartupDialog
