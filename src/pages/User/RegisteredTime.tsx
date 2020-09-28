import React from 'react'
import { Typography } from '@material-ui/core'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'src/hooks'

const useStyles = makeStyles((theme) => ({
  hintColor: {
    color: theme.palette.text.hint,
  },
}))

export const RegisteredTime = () => {
  const classes = useStyles()
  const user = useSelector((store) => store.user.profile.user.data)
  const text = user.sex === '1' ? 'Зарегестрировался' : 'Зарегестрировалась'
  const timeRegistered = (ti?: string, tr?: string) => {
    if (ti && ti === tr) {
      return 'в то же время'
    } else return moment(tr).fromNow()
  }
  return (
    <Typography variant="caption" className={classes.hintColor}>
      {text} {timeRegistered(user.time_invited, user.time_registered)}
    </Typography>
  )
}
