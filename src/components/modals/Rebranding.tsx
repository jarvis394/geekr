import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ButtonBase, Dialog, Typography } from '@material-ui/core'
import { REBRANDING_MODAL_WAS_SHOWN } from 'src/config/constants'

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1.8, 2),
    maxWidth: 380,
    borderRadius: 16,
    justifyContent: 'center',
  },
  imageHolder: {
    display: 'flex',
    aspectRatio: 'auto 1000 / 640',
    padding: theme.spacing(2, 3),
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Google Sans',
    fontWeight: 800,
    textAlign: 'center',
    marginTop: theme.spacing(1.5),
  },
  text: {
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: 400,
    textAlign: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1.5),
    color: theme.palette.text.secondary,
  },
  button: {
    fontFamily: 'Google Sans',
    fontSize: 16,
    fontWeight: 500,
    padding: theme.spacing(1.5, 2),
    borderRadius: 12,
    background: theme.palette.action.hover,
    marginTop: theme.spacing(1.25),
    width: '100%',
    '-webkit-tap-highlight-color': 'transparent !important',
  },
  buttonPrimary: {
    background: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.primary.main),
  },
  link: {
    width: '100%',
    display: 'flex',
    color: theme.palette.text.primary,
    textDecoration: 'none',
    '-webkit-tap-highlight-color': 'transparent !important',
  },
}))

const Rebranding = () => {
  const classes = useStyles()
  const shouldShow = localStorage.getItem(REBRANDING_MODAL_WAS_SHOWN) !== 'true'
  const [isOpen, setOpen] = useState(shouldShow)
  const close = () => {
    setOpen(false)
    localStorage.setItem(REBRANDING_MODAL_WAS_SHOWN, 'true')
  }

  return (
    <Dialog open={isOpen} classes={{ paper: classes.paper }}>
      <div className={classes.imageHolder}>
        <img
          className={classes.image}
          src={process.env.PUBLIC_URL + '/images/rebranding.png'}
        />
      </div>
      <Typography className={classes.title}>Теперь это geekr.</Typography>
      <Typography className={classes.text}>
        Для того, чтобы поддержать разработчиков официального Хабра, мы провели
        ребрендинг.
      </Typography>
      <a
        href="https://github.com/jarvis394/geekr/discussions/145"
        target="_blank"
        rel="noreferrer"
        className={classes.link}
      >
        <ButtonBase className={classes.button}>Узнать больше</ButtonBase>
      </a>
      <ButtonBase
        onClick={close}
        className={[classes.button, classes.buttonPrimary].join(' ')}
      >
        Продолжить
      </ButtonBase>
    </Dialog>
  )
}

export default Rebranding
