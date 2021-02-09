import * as React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { POST_IMAGE_HEIGHT } from 'src/config/constants'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: '12px',
    background: theme.palette.background.paper,
    borderRadius: 0,
  },
  padding: {
    padding: theme.spacing(2),
  },
  skeleton: {
    backgroundColor: theme.palette.action.hover,
    borderRadius: 4,
  },
  skeletonImage: {
    borderRadius: 0,
    backgroundColor: theme.palette.action.hover,
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
          className={classes.padding}
          style={{ width: '100%' }}
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
            className={classes.skeletonImage}
            height={POST_IMAGE_HEIGHT}
          />
        </Grid>
        <Grid container className={classes.padding}>
          <Grid item xs={12}>
            <Skeleton
              variant="rect"
              width="100%"
              className={classes.skeleton}
              height={18}
            />
          </Grid>
          <Grid item xs={12}>
            <Skeleton
              variant="rect"
              width="75%"
              className={classes.skeleton}
              height={18}
              style={{ marginTop: 16 }}
            />
          </Grid>
          <Grid container style={{ width: '100%' }} direction="row">
            {Array(4)
              .fill(null)
              .map((_, i) => (
                <Grid
                  justify="center"
                  style={{ width: '25%' }}
                  container
                  key={i}
                >
                  <Skeleton
                    variant="rect"
                    width={64}
                    style={{ marginTop: 20 }}
                    className={classes.skeleton}
                    height={21}
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default React.memo(PostSkeleton)
