import React from 'react'
import { Typography } from '@material-ui/core'
import dayjs from 'dayjs'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'src/hooks'

const useStyles = makeStyles((theme) => ({
  hintColor: {
    color: theme.palette.text.hint,
  },
}))

export const RegisteredTime = () => {
  const classes = useStyles()
  const user = useSelector((store) => store.profile.profile.card?.data)
  const whois = useSelector((store) => store.profile.profile.whois?.data)
  const text = user?.gender === '1' ? 'Зарегистрировался' : 'Зарегистрировалась'
  const timeRegistered = (ti?: string, tr?: string) => {
    if (ti && ti === tr) {
      return 'в то же время'
    } else return dayjs(tr).fromNow()
  }
  return (
    <Typography variant="caption" className={classes.hintColor}>
      {user?.gender !== '0' && (
        <>
          {text}{' '}
          {timeRegistered(
            whois?.invitedBy?.timeCreated,
            user?.registerDateTime
          )}
        </>
      )}
      {user?.gender === '0' && (
        <>Дата регистрации: {dayjs(user.registerDateTime).fromNow()}</>
      )}
    </Typography>
  )
}
