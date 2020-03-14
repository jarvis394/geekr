import React from 'react'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/styles/makeStyles'
import { Link } from 'react-router-dom'

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
}))

const ErrorComponent = ({ message, onHomeClick }) => {
  const classes = useStyles()
  return (
    <div className={classes.centered}>
      <Typography className={classes.googleFont} variant="h6">
        {message}
      </Typography>
      <Typography className={classes.googleFont} variant="h6">
        <Link onClick={onHomeClick} to="/page/1" className={classes.link}>
          Домой
        </Link>
      </Typography>
    </div>
  )
}

export default ErrorComponent