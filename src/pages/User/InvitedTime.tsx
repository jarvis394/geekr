import React from 'react'
import { Typography } from '@material-ui/core'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'src/hooks'

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:hover': {
      textDecoration: 'underline',
      color: theme.palette.primary.dark,
    },
  },
}))

export const InvitedTime = () => {
  const classes = useStyles()
  const user = useSelector((store) => store.profile.profile.user.data)
  const timeInvited = dayjs(user.time_invited).fromNow()
  const textTimeInvited = timeInvited[0].toUpperCase() + timeInvited.slice(1)
  const wasInvitedText = user.sex === '1' ? 'был приглашён' : 'была приглашена'
  return (
    user.time_invited && (
      <Typography variant="caption" color="textSecondary">
        {textTimeInvited} {wasInvitedText}{' '}
        {user.invited_by_login ? (
          <Link className={classes.link} to={'/user/' + user.invited_by_login}>
            @{user.invited_by_login}
          </Link>
        ) : (
          'НЛО'
        )}
      </Typography>
    )
  )
}
