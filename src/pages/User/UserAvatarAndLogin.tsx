import React from 'react'
import { Typography } from '@material-ui/core'
import UserAvatar from 'src/components/blocks/UserAvatar'
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
  avatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    borderRadius: '50%',
  },
  login: {
    fontFamily: 'Google Sans',
    fontWeight: 800,
    fontSize: 24,
    marginTop: theme.spacing(1),
  },
}))

export const UserAvatarAndLogin = () => {
  const classes = useStyles()
  const user = useSelector((store) => store.profile.profile.user.data)

  return (
    <>
      <UserAvatar
        className={classes.avatar}
        login={user.login}
        src={user.avatar}
      />
      {user.fullname ? (
        <>
          <Typography className={classes.login}>{user.fullname}</Typography>
          <Link to={'/user/' + user.login} className={classes.link}>
            @{user.login}
          </Link>
        </>
      ) : (
        <Typography className={classes.login}>@{user.login}</Typography>
      )}
    </>
  )
}
