import React from 'react'
import { Typography } from '@material-ui/core'
import dayjs from 'dayjs'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'src/hooks'
import LinkToOutsidePage from 'src/components/blocks/LinkToOutsidePage'

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

export const InvitedTime: React.FC = () => {
  const classes = useStyles()
  const user = useSelector((store) => store.profile.profile.card?.data)
  const whois = useSelector((store) => store.profile.profile.whois?.data)
  const timeInvited = dayjs(whois?.invitedBy?.timeCreated).fromNow()
  const textTimeInvited = timeInvited[0].toUpperCase() + timeInvited.slice(1)
  const wasInvitedText =
    user?.gender === '1' ? 'был приглашён' : 'была приглашена'

  return whois?.invitedBy?.timeCreated ? (
    <Typography variant="caption" color="textSecondary" align="center">
      {textTimeInvited}{' '}
      {user?.gender === '0' ? 'было получено приглашение от' : wasInvitedText}{' '}
      {whois.invitedBy.issuerLogin ? (
        <LinkToOutsidePage
          className={classes.link}
          to={'/user/' + whois.invitedBy.issuerLogin}
        >
          @{whois.invitedBy.issuerLogin}
        </LinkToOutsidePage>
      ) : (
        'НЛО'
      )}
    </Typography>
  ) : null
}
