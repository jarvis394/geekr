import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    marginBottom: '15px',
    background: theme.palette.background.paper,
    borderRadius: 0,
  },
  skeleton: {
    maxWidth: '100%',
    backgroundColor: theme.palette.action.hover,
    borderRadius: 4
  }
}))

const PostSkeleton = () => {
  const classes = useStyles()

  return (
    <Paper elevation={0} className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Skeleton
            variant="rect"
            width={512}
            className={classes.skeleton}
            height={14}
          />
        </Grid>
        <Grid item xs={12}>
          <Skeleton
            variant="rect"
            width={256}
            style={{ marginTop: 14 }}
            className={classes.skeleton}
            height={14}
          />
        </Grid>
        <Grid item xs={12}>
          <Skeleton
            variant="rect"
            width={512}
            style={{ marginTop: 12 }}
            className={classes.skeleton}
            height={28}
          />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default PostSkeleton
