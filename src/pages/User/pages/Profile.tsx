import React, { useEffect } from 'react'
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
import Children from '../Children'
import Companies from '../Companies'
import Hubs from '../Hubs'
import ProfileLinks from '../ProfileLinks'
import { useSelector } from 'src/hooks'
import fadedLinearGradient from 'src/utils/fadedLinearGradient'
import getContrastPaperColor from 'src/utils/getContrastPaperColor'

export const useStyles = makeStyles((theme) => ({
  topBlock: {
    background: fadedLinearGradient(theme),
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: theme.spacing(2),
    paddingBottom: 0,
  },
  mainBlock: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    backgroundColor: getContrastPaperColor(theme),
  },
  blockMargin: {
    marginTop: theme.spacing(2),
  },
}))

const Profile = () => {
  const classes = useStyles()
  const user = useSelector((state) => state.profile.profile.card?.data)

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {}, [user?.alias])

  return (
    <>
      <div className={classes.topBlock}>
        {[
          UserAvatarAndLogin,
          Statistics,
          FollowersCount,
          InvitedTime,
          RegisteredTime,
          ProfileLinks,
        ].map((Component, i) => (
          <Component key={i} />
        ))}
      </div>
      <div className={classes.mainBlock}>
        {[
          Specialisation,
          Badges,
          About,
          Hubs,
          Contacts,
          Children,
          Companies,
        ].map((Component, i) => (
          <Component key={i} classes={classes.blockMargin} />
        ))}
      </div>
    </>
  )
}

export default React.memo(Profile)
