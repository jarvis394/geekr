import * as React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import random from 'src/utils/random'

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    background: theme.palette.background.paper,
    borderRadius: 0,
  },
  skeleton: {
    maxWidth: 512,
    backgroundColor: theme.palette.action.hover,
    borderRadius: 4,
  },
}))

const NewsItemSkeleton = () => {
  const classes = useStyles()

  return (
    <Paper elevation={0} className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Skeleton
            variant="rect"
            width={random(75, 100) + '%'}
            className={classes.skeleton}
            height={14}
          />
        </Grid>
        <Grid item xs={12}>
          <Skeleton
            variant="rect"
            width={random(75, 100) + '%'}
            className={classes.skeleton}
            height={14}
            style={{ marginTop: 8 }}
          />
        </Grid>
        <Grid item xs={12}>
          <Skeleton
            variant="rect"
            width="50%"
            className={classes.skeleton}
            height={12}
            style={{ marginTop: 8 }}
          />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default NewsItemSkeleton
