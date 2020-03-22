import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import MobileStepper from '@material-ui/core/MobileStepper'
import Button from '@material-ui/core/Button'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import MUIPagination from '@material-ui/lab/Pagination'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    color: disabled =>
      disabled ? theme.palette.text.hint : theme.palette.text.main,
    fontFamily: 'Google Sans',
    fontWeight: 500,
    fontSize: 14,
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
  },
}))

const Pagination = ({
  disabled = false,
  steps,
  handleChange,
  currentStep = 1,
}) => {
  const classes = useStyles(disabled)

  return (
    <>
      {/* <MobileStepper
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
      /> */}
      <MUIPagination
        onChange={handleChange}
        className={classes.root}
        disabled={disabled}
        count={steps}
        defaultPage={currentStep}
        variant="outlined"
        shape="rounded"
      />
    </>
  )
}

export default Pagination
