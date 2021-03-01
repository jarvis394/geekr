import React, { useEffect } from 'react'
import { darken, fade, lighten, makeStyles } from '@material-ui/core/styles'
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

export const useStyles = makeStyles((theme) => {
  const t =
    theme.palette.type === 'light'
      ? lighten(theme.palette.background.default, 1)
      : darken(theme.palette.background.paper, 0.2)
  return {
    topBlock: {
      background: `linear-gradient(to top,
      ${t},
      ${fade(t, 0.98)},
      ${fade(t, 0.94)},
      ${fade(t, 0.88)},
      ${fade(t, 0.8)},
      ${fade(t, 0.71)},
      ${fade(t, 0.61)},
      ${fade(t, 0.5)},
      ${fade(t, 0.39)},
      ${fade(t, 0.29)},
      ${fade(t, 0.2)},
      ${fade(t, 0.12)},
      ${fade(t, 0.06)},
      ${fade(t, 0.02)},
      ${fade(t, 0.0)})`,
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
      backgroundColor: theme.palette.background.default,
    },
    blockMargin: {
      marginTop: theme.spacing(2),
    },
  }
})

const Profile = () => {
  const classes = useStyles()
  const user = useSelector((state) => state.profile.profile.user.data)

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {}, [user.login])

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
