import * as React from 'react'
import NotFoundSVG from '../components/svg/NotFound'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import isMobile from 'is-mobile'

const chromeAddressBarHeight = 56
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 600,
    flexDirection: 'column',
    height: `calc(100vh - 96px - ${
      isMobile() ? chromeAddressBarHeight : '0'
    }px)`,
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
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    '& svg': { maxWidth: 256, width: '100%', height: '100%' },
  },
}))

const NotFound = () => {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>four-o-four</Typography>
      <Typography className={classes.text}>Страница не найдена.</Typography>
      <Typography className={classes.text}>
        Может,{' '}
        <Link to="/" className={classes.link}>
          вернёмся домой
        </Link>
        ?
      </Typography>
      <NotFoundSVG theme={theme.palette.type} className={classes.svg} />
    </div>
  )
}

export default React.memo(NotFound)
