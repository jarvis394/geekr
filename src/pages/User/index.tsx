import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { UserExtended as UserObjectExtended } from 'src/interfaces/User'
import { getUser } from 'src/api'
import UserPageSkeleton from 'src/components/skeletons/UserPage'
import ErrorComponent from 'src/components/blocks/Error'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from './Tabs'
import { UserAvatarAndLogin } from './UserAvatarAndLogin'
import { Statistics } from './Statistics'
import { InvitedTime } from './InvitedTime'
import { RegisteredTime } from './RegisteredTime'
import { FollowersCount } from './FollowersCount'
import { About } from './About'
import { Badges } from './Badges'
import { Contacts } from './Contacts'
import { Specialisation } from './Specialisation'

export const useStyles = makeStyles((theme) => ({
  topBlock: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: theme.spacing(2),
  },
  mainBlock: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    backgroundColor: theme.palette.background.default
  },
  blockMargin: {
    marginTop: theme.spacing(2),
  },
}))

export interface ComponentWithUserParams {
  user: UserObjectExtended
  classes?: string
}

interface UserParams {
  login: string
}

const User = () => {
  const [user, setUser] = useState<UserObjectExtended>()
  const [fetchError, setFetchError] = useState<string>()
  const { login } = useParams<UserParams>()
  const classes = useStyles()

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

  return (
    <>
      <Tabs />
      {user ? (
        <>
          <div className={classes.topBlock}>
            {[
              UserAvatarAndLogin,
              Statistics,
              FollowersCount,
              InvitedTime,
              RegisteredTime,
            ].map((Component, i) => (
              <Component key={i} user={user} />
            ))}
          </div>
          <div className={classes.mainBlock}>
            {[Specialisation, Badges, About, Contacts].map((Component, i) => (
              <Component key={i} user={user} classes={classes.blockMargin} />
            ))}
          </div>
        </>
      ) : (
        <UserPageSkeleton />
      )}
    </>
  )
}

export default User
