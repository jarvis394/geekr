import * as React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    marginBottom: '15px',
    background: theme.palette.background.paper,
    borderRadius: 0,
  },
  skeleton: {
    backgroundColor: theme.palette.action.hover,
    borderRadius: 4,
  },
}))

const PostSkeleton = () => {
  const classes = useStyles()

  return (
    <Paper elevation={0} className={classes.root}>
      <Grid container>
        <Grid
          direction="row"
          alignItems="center"
          container
          style={{ marginBottom: 14, width: '100%' }}
        >
          <Skeleton
            variant="circle"
            width={20}
            height={20}
            className={classes.skeleton}
            style={{ marginRight: 8 }}
          />
          <Skeleton
            variant="text"
            width={128}
            className={classes.skeleton}
            height={20}
          />
        </Grid>
        <Grid item xs={12}>
          <Skeleton
            variant="rect"
            width="100%"
            className={classes.skeleton}
            height={14}
          />
        </Grid>
        <Grid item xs={12}>
          <Skeleton
            variant="rect"
            width="75%"
            className={classes.skeleton}
            height={14}
            style={{ marginTop: 16 }}
          />
        </Grid>
        <Grid container style={{ width: '100%' }} direction="row">
          {Array(4)
            .fill(null)
            .map((_, i) => (
              <Grid justify="center" style={{ width: '25%' }} container key={i}>
                <Skeleton
                  variant="rect"
                  width={64}
                  style={{ marginTop: 20 }}
                  className={classes.skeleton}
                  height={20}
                />
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Paper>
  )
}

export default PostSkeleton
