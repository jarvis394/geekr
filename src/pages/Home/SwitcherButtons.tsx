import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, alpha, Grid } from '@material-ui/core'
import { ModeObject } from 'src/interfaces'
import { Mode } from 'src/config/constants'
import isDarkTheme from 'src/utils/isDarkTheme'

const useStyles = makeStyles((theme) => ({
  button: {
    background: alpha(theme.palette.divider, isDarkTheme(theme) ? 0.1 : 0.03),
    borderRadius: 8,
    color: alpha(theme.palette.text.primary, 0.5),
    fontFamily: 'Google Sans',
    fontWeight: 500,
    '&:hover': {
      background: alpha(theme.palette.divider, 0.1),
    },
    fontSize: 15,
    minHeight: 40,
    textTransform: 'none',
  },
  buttonChecked: {
    textTransform: 'none',
    minHeight: 40,
    borderRadius: 8,
    fontFamily: 'Google Sans',
    fontWeight: 500,
    fontSize: 15,
    background: theme.palette.primary.main + ' !important',
    color: theme.palette.getContrastText(theme.palette.primary.main),
    boxShadow:
      '0 3px 6px ' + alpha(theme.palette.primary.main, 0.1) + ' !important',
  },
  inlineContainer: {
    display: 'inline-flex',
    gap: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  inlineButton: {
    padding: theme.spacing(1, 2),
    fontSize: 16,
    minHeight: '36px !important',
  },
}))

interface Params {
  data: ModeObject[]
  onChange: (e: ModeObject) => void
  currentValue: Mode
  inline?: boolean
}

const SwitcherButtons = ({
  data,
  onChange,
  currentValue,
  inline = false,
}: Params) => {
  const classes = useStyles()
  const fullWidthIndex = data.length % 2 === 1 ? data.length - 1 : -1

  if (inline) {
    return (
      <div className={classes.inlineContainer}>
        {data.map((e, i) => (
          <Button
            key={i}
            onClick={() => onChange(e)}
            color="primary"
            variant="text"
            className={
              (e.mode === currentValue
                ? classes.buttonChecked
                : classes.button) +
              ' ' +
              classes.inlineButton
            }
          >
            {e.switcherText}
          </Button>
        ))}
      </div>
    )
  }

  return (
    <Grid container spacing={1}>
      {data.map((e, i) => (
        <Grid
          item
          key={i}
          xs={fullWidthIndex === i ? 12 : 6}
          sm={fullWidthIndex === i ? 8 : 4}
        >
          <Button
            fullWidth
            onClick={() => onChange(e)}
            color="primary"
            variant="text"
            className={
              e.mode === currentValue ? classes.buttonChecked : classes.button
            }
          >
            {e.switcherText}
          </Button>
        </Grid>
      ))}
    </Grid>
  )
}

export default React.memo(SwitcherButtons)
