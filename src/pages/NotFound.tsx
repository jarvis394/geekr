import * as React from 'react'
import NotFoundSVG from '../components/svg/NotFound'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: 'calc(100vh - 48px)',
  },
  title: {
    fontFamily: 'Google Sans',
    fontWeight: 800,
    fontSize: 28,
  },
  text: {
    fontFamily: 'Google Sans',
    fontSize: 16,
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:hover': {
      textDecoration: 'underline',
      color: theme.palette.primary.light,
    },
  },
  svg: {
    marginTop: theme.spacing(4),
    width: '75%',
    display: 'flex',
    justifyContent: 'center',
    '& svg': { maxWidth: 300, width: '100%', height: '100%' },
  },
}))

const NotFound = () => {
  const classes = useStyles()

  React.useEffect(() => window.scrollTo(0, 0), [])

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>four-o-four</Typography>
      <Typography className={classes.text}>
        Упс! Может,{' '}
        <Link to="/" className={classes.link}>
          вернёмся домой
        </Link>
        ?
      </Typography>
      <NotFoundSVG className={classes.svg} />
    </div>
  )
}

export default NotFound
