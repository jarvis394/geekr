import React from 'react'
import { Typography, Chip, Grid } from '@material-ui/core'
import { ComponentWithUserParams } from './index'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'src/hooks'

const useStyles = makeStyles((theme) => ({
  blockTitle: {
    fontSize: 24,
    fontWeight: 500,
    fontFamily: 'Google Sans',
    marginBottom: theme.spacing(1),
  },
  badges: {
    marginBottom: theme.spacing(1),
  },
}))

export const Badges = ({
  classes: additionalClasses,
}: ComponentWithUserParams) => {
  const classes = useStyles()
  const user = useSelector((store) => store.profile.profile.user.data)

  return user.badges ? (
    <div className={additionalClasses}>
      <Typography className={classes.blockTitle}>Значки</Typography>
      <Grid spacing={1} container className={classes.badges}>
        {Object.values(user.badges).map((e, i) => (
          <Grid key={i} item>
            <Chip
              style={{ cursor: 'help' }}
              title={e.description}
              variant="outlined"
              color="primary"
              label={e.title}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  ) : null
}
