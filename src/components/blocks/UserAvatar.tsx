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
  const state = !!src

  return (
    <div {...props} className={className + ' ' + classes.root}>
      {!state && <Avatar className={className || classes.root} src={src} />}
      {state && <UserPlaceholder num={login.length} />}
    </div>
  )
}

export default UserAvatar
