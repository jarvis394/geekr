import React from 'react'
import { fade, makeStyles, Typography } from '@material-ui/core'
import { useSelector } from 'src/hooks'

const useStyles = makeStyles((theme) => ({
  root: {
    background: fade(theme.palette.divider, 0.075),
    padding: theme.spacing(1.5, 2),
  },
}))

const KarmaStatistics = () => {
  const classes = useStyles()
  const user = useSelector((store) => store.auth.me.data)

  return (
    <div className={classes.root}>
      <Typography variant="body1">
        У вас <b>{user?.settings?.chargeSettings?.postVoteCount}</b> голосов за
        карму и публикации, и ещё{' '}
        <b>{user?.settings?.chargeSettings?.commentVoteCount}</b> голосов за
        комментарии
      </Typography>
    </div>
  )
}

export default React.memo(KarmaStatistics)
