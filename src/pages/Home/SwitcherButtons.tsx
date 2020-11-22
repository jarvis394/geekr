import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Grid } from '@material-ui/core'
import { ModeObject } from 'src/interfaces'
import { Mode } from 'src/config/constants'

const useStyles = makeStyles((theme) => ({
  buttonChecked: {
    background: theme.palette.primary.main + ' !important',
    color: theme.palette.getContrastText(theme.palette.primary.main),
  },
}))

interface Params {
  data: ModeObject[]
  onChange: (e: ModeObject) => void
  currentValue: Mode
}

const SwitcherButtons = ({ data, onChange, currentValue }: Params) => {
  const classes = useStyles()

  return (
    <Grid container spacing={1}>
      {data.map((e, i) => (
        <Grid item key={i}>
          <Button
            disableElevation
            onClick={() => onChange(e)}
            color="primary"
            variant="outlined"
            className={e.mode === currentValue ? classes.buttonChecked : ''}
          >
            {e.switcherText}
          </Button>
        </Grid>
      ))}
    </Grid>
  )
}

export default React.memo(SwitcherButtons)
