import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { UserExtended as UserObjectExtended } from 'src/interfaces/User'
import { getUser } from 'src/api'
import UserPageSkeleton from 'src/components/skeletons/UserPage'
import ErrorComponent from 'src/components/blocks/Error'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Chip, Grid } from '@material-ui/core'
import moment from 'moment'
import Tabs from './Tabs'
import UserAvatar from 'src/components/blocks/UserAvatar'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  topBlock: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: theme.spacing(2),
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
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:hover': {
      textDecoration: 'underline',
      color: theme.palette.primary.dark,
    },
  },
  hintColor: {
    color: theme.palette.text.hint,
  },
  badges: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}))

interface UserParams {
  login: string
}

const User = () => {
  const [user, setUser] = useState<UserObjectExtended>()
  const [fetchError, setFetchError] = useState<string>()
  const { login } = useParams<UserParams>()
  const classes = useStyles()
  const timeRegistered = user
    ? user.time_registered === user.time_invited
      ? moment(user.time_registered).fromNow()
      : 'в то же время'
    : null

  useEffect(() => {
    const get = async () => {
      try {
        const data = await getUser(login)
        if (!data.success) return setFetchError('Пользователь не найден')
        else setUser(data.data.user)
      } catch (e) {
        setFetchError(e.message)
      }
    }
    get()
  }, [login])

  console.log(user)

  if (fetchError) return <ErrorComponent message={fetchError} />

  return user ? (
    <>
      <Tabs />
      <div className={classes.topBlock}>
        <UserAvatar
          className={classes.avatar}
          login={login}
          src={user.avatar}
        />
        <Typography className={classes.login}>{user.login}</Typography>
        <Grid className={classes.badges} container spacing={1} justify="center">
          {user.badges.map((e, i) => (
            <Grid item key={i}>
              <Chip size="small" variant="outlined" color="primary" label={e.title} />
            </Grid>
          ))}
        </Grid>
        <Typography variant="caption" color="textSecondary">
          <Link className={classes.link} to={'/user/' + (user.invited_by_login || 'НЛО')}>
            {user.invited_by_login || 'НЛО'}
          </Link>{' '}
          пригласил {moment(user.time_invited).fromNow()}
        </Typography>
        <Typography variant="caption" className={classes.hintColor}>
          Зарегестрировался {timeRegistered}
        </Typography>
      </div>
    </>
  ) : (
    <UserPageSkeleton />
  )
}

export default User
