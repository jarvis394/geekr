import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ButtonBase, Typography } from '@material-ui/core'
import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'rgb(0 107 204 / 7%)',
    borderRadius: 8,
    margin: theme.spacing(1.8, 2),
    marginBottom: 0,
    padding: theme.spacing(1.5, 2),
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    textAlign: 'initial'
  },
  title: {
    color: 'rgb(166, 213, 250)',
    fontWeight: 700,
    fontSize: 17,
    fontFamily: 'Google Sans',
  },
  subtitle: {
    fontWeight: 500,
    fontFamily: 'Google Sans',
    fontSize: 14,
    color: 'rgba(166, 213, 250, 0.6)',
    maxWidth: '90%'
  },
  text: {
    flexDirection: 'column',
    flexGrow: 1
  }
}))

const UpdateNotification = () => {
  const [isShown, setIsShown] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    const receiveMessage = (event: MessageEvent<string>) => {
      if (
        event.data === 'showUpdateNotification' &&
        event.origin === process.env.PUBLIC_URL
      ) {
        setIsShown(true)
      }
    }
    window.addEventListener('message', receiveMessage)
    return () => window.removeEventListener('message', receiveMessage)
  })
  
  const onClick = () => {
    window.location.reload()
  }

  return isShown ? (
    <ButtonBase className={classes.root} onClick={onClick}>
      <div className={classes.text}>
        <Typography className={classes.title}>Доступно обновление</Typography>
        <Typography className={classes.subtitle}>Обновите страницу, чтобы изменения вступили в силу</Typography>
      </div>
      <RefreshRoundedIcon style={{ color: 'rgb(166, 213, 250)' }} />
    </ButtonBase>
  ) : null
}

export default UpdateNotification
