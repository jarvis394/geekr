import * as React from 'react'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/styles/makeStyles'
import { Link } from 'react-router-dom'
import { ReactSVG } from 'react-svg'

const useStyles = makeStyles(theme => ({
  centered: {
    height: 'calc(100% - 48px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  googleFont: { fontFamily: 'Google Sans' },
  link: {
    textDecoration: 'underline',
    color: theme.palette.primary.main,
    fontWeight: 500,
  },
  svg: {
    '& svg': { height: '100%', width: '100%' },
    width: '65%',
    marginTop: theme.spacing(4),
    maxWidth: 300,
  }
}))

const ErrorComponent = ({ message, onHomeClick }) => {
  const classes = useStyles()
  return (
    <div className={classes.centered}>
      <Typography className={classes.googleFont} variant="h6">
        {message}
      </Typography>
      <Typography className={classes.googleFont} variant="h6">
        <Link onClick={onHomeClick} to="/" className={classes.link}>
          Домой
        </Link>
      </Typography>
      <ReactSVG src="/error.svg" className={classes.svg} />
    </div>
  )
}

export default ErrorComponent