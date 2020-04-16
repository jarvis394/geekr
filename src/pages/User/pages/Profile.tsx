/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { UserAvatarAndLogin } from '../UserAvatarAndLogin'
import { Statistics } from '../Statistics'
import { InvitedTime } from '../InvitedTime'
import { RegisteredTime } from '../RegisteredTime'
import { FollowersCount } from '../FollowersCount'
import { About } from '../About'
import { Badges } from '../Badges'
import { Contacts } from '../Contacts'
import { Specialisation } from '../Specialisation'
import getUserChildren from 'src/api/user/getUserChildren'
import getUserCompanies from 'src/api/user/getUserCompanies'
import { UserExtended, UserChildren, UserCompanies } from 'src/interfaces/User'
import Children from '../Children'
import { Typography } from '@material-ui/core'
import Companies from '../Companies'

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
    backgroundColor: theme.palette.background.default,
  },
  blockMargin: {
    marginTop: theme.spacing(2),
  },
  errorTitle: {
    color: theme.palette.error.main,
    fontWeight: 500,
    fontFamily: 'Google Sans',
    marginTop: theme.spacing(2),
  },
}))

const Profile = ({ user }: { user: UserExtended }) => {
  const classes = useStyles()
  const [children, setChildren] = useState<UserChildren>()
  const [companies, setCompanies] = useState<UserCompanies>()
  const [fetchError, setError] = useState<Record<string, string>>({
    companies: '',
    children: '',
  })

  useEffect(() => {
    const get = async (
      func: any,
      setter: any,
      field: string,
      message: string
    ) => {
      try {
        setError((prev) => ({ ...prev, [field]: '' }))
        const data = await func(user.login)
        setter(data.data)
      } catch (e) {
        setError((prev) => ({ ...prev, [field]: message }))
      }
    }
    get(
      getUserChildren,
      setChildren,
      'children',
      'Не удалось загрузить список приглашённых пользователей'
    )
    get(
      getUserCompanies,
      setCompanies,
      'companies',
      'Не удалось загрузить список компаний'
    )
  }, [user])

  const Errors = ({ map }) => {
    const textArray = []
    for (const key in map) textArray.push(map[key])

    return (
      <>
        {textArray.map((e, i) => (
          e && <Typography key={i} className={classes.errorTitle}>
            {e}
          </Typography>
        ))}
      </>
    )
  }

  return (
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
        <Errors map={fetchError} />
        {[Specialisation, Badges, About, Contacts, Children, Companies].map(
          (Component, i) => (
            <Component
              key={i}
              childrenData={children}
              user={user}
              companies={companies}
              classes={classes.blockMargin}
            />
          )
        )}
      </div>
    </>
  )
}

export default Profile
