import React from 'react'
import { Typography, Chip, Grid } from '@material-ui/core'
import { ComponentWithUserParams } from './index'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
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

export const Badges = ({ user, classes: additionalClasses }: ComponentWithUserParams) => {
  const classes = useStyles()
  return user.badges.length !== 0 ? (
    <div className={additionalClasses}>
      <Typography className={classes.blockTitle}>Значки</Typography>
      <Grid spacing={1} container className={classes.badges}>
        {user.badges.map((e, i) => (
          <Grid key={i} item>
            <Chip variant="outlined" color="primary" label={e.title} />
          </Grid>
        ))}
      </Grid>
    </div>
  ) : null
}
