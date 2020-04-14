import React from 'react'
import { Typography } from '@material-ui/core'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { ComponentWithUserParams } from './index'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:hover': {
      textDecoration: 'underline',
      color: theme.palette.primary.dark,
    },
  },
}))

export const InvitedTime = ({ user }: ComponentWithUserParams) => {
  const classes = useStyles()
  const timeInvited = moment(user.time_invited).fromNow()
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
