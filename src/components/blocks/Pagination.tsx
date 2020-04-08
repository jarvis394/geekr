import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MUIPagination from '@material-ui/lab/Pagination'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: (disabled) =>
      disabled ? theme.palette.text.hint : theme.palette.text.primary,
    fontFamily: 'Google Sans',
    fontWeight: 500,
    fontSize: 14,
    paddingBottom: theme.spacing(2),
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
    <MUIPagination
      onChange={handleChange}
      className={classes.root}
      disabled={disabled}
      count={steps}
      defaultPage={currentStep}
      variant="outlined"
      color="primary"
      shape="rounded"
    />
  )
}

export default React.memo(Pagination)
