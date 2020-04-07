import React from 'react'
import { Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import UserPlaceholder from '../svg/UserPlaceholder'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 20,
    height: 20,
    borderRadius: theme.shape.borderRadius,
  },
}))

const UserAvatar = ({
  src,
  login,
  className,
  ...props
}: {
  src: string
  login: string
  className?: string
}) => {
  const classes = useStyles()
  const state = [
    'habr.com/images/avatars/stub-user',
    'habr.com/images/stub-user',
  ].some((e) => src.split('//')[1].startsWith(e))

  return (
    <div {...props} className={className + ' ' + classes.root}>
      {!state && <Avatar className={classes.root} src={src} />}
      {state && <UserPlaceholder num={login.length} />}
    </div>
  )
}

export default UserAvatar
