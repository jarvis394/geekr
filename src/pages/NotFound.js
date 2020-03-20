import React from 'react'
import { ReactSVG } from 'react-svg'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%',
  },
  title: {
    fontFamily: 'Google Sans',
    fontWeight: 800,
    fontSize: 28
  },
  text: {
    fontFamily: 'Google Sans',
    fontSize: 16
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:hover': {
      textDecoration: 'underline',
      color: theme.palette.primary.light,
    }
  },
  svg: {
    marginTop: theme.spacing(4),
    '& svg': { maxWidth: 500, width: '100%', height: '100%' }
  }
}))

const NotFound = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>four-o-four</Typography>
      <Typography className={classes.text}>content not found, maybe <Link to="/" className={classes.link}>go home</Link>?</Typography>
      <ReactSVG className={classes.svg} src="notfound.svg" />
    </div>
  )
}

export default NotFound
