import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import MobileStepper from '@material-ui/core/MobileStepper'
import Button from '@material-ui/core/Button'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    color: disabled => disabled ? theme.palette.text.hint : theme.palette.text.main,
    fontFamily: 'Google Sans',
    fontWeight: 500,
    fontSize: 14,
    background: theme.palette.background.paper
  },
}))

const DotStepper = ({
  disabled = false,
  steps,
  handleNext: handleNextComp,
  handleBack: handleBackComp,
  currentStep,
}) => {
  const classes = useStyles(disabled)
  const theme = useTheme()
  const [activeStep, setActiveStep] = React.useState(currentStep * 1)

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
    handleNextComp && handleNextComp(activeStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
    handleBackComp && handleBackComp(activeStep - 1)
  }

  return (
    <>
      <MobileStepper
        variant="text"
        steps={steps}
        position="static"
        activeStep={activeStep}
        className={classes.root}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={(activeStep >= steps - 1) || disabled}
          >
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={handleBack}
            disabled={(activeStep <= 0) || disabled}
          >
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </Button>
        }
      />
    </>
  )
}

export default DotStepper
