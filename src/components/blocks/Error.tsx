import * as React from 'react'
import { Typography } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles'
import isMobile from 'is-mobile'

const chromeAddressBarHeight = 56
const useStyles = makeStyles((theme) => ({
  centered: {
    height: `calc(100vh - 96px - 194px - ${
      isMobile() ? chromeAddressBarHeight : '0'
    }px)`,
    minHeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    '@media (min-width: 768px)': {
      flexDirection: 'row',
    },
  },
  code: {
    paddingBottom: theme.spacing(2),
    fontFamily: 'Google Sans',
    fontSize: 28,
    fontWeight: 500,
    width: 100,
    textAlign: 'center',
    borderBottom: '1px solid ' + theme.palette.divider,
    '@media (min-width: 768px)': {
      width: 'auto',
      borderBottom: 0,
      paddingRight: theme.spacing(2.5),
      paddingBottom: 0,
      borderRight: '1px solid ' + theme.palette.divider,
      lineHeight: '48px',
    },
  },
  message: {
    fontFamily: 'Segoe UI',
    fontSize: 16,
    fontWeight: 400,
    paddingTop: theme.spacing(3),
    '@media (min-width: 768px)': {
      paddingLeft: theme.spacing(2.5),
      paddingTop: 0,
    },
  },
}))

interface Params {
  code?: number | string
  message: string
  to?: string
}

const ErrorComponent = ({ code = 500, message, to = '/' }: Params) => {
  const classes = useStyles()

  return (
    <div className={classes.centered}>
      <Typography className={classes.code}>{code}</Typography>
      <Typography className={classes.message}>{message}</Typography>
    </div>
  )
}

export default ErrorComponent
