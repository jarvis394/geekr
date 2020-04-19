import * as React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    background: theme.palette.background.paper,
    borderRadius: 0,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  skeleton: {
    backgroundColor: theme.palette.action.hover,
  },
  login: {
    marginTop: theme.spacing(1),
  },
  stats: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  headerColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    display: 'flex',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}))

const ProfileSkeleton = () => {
  const classes = useStyles()

  return (
    <Paper elevation={0} className={classes.root}>
      <Skeleton
        className={classes.skeleton}
        variant="circle"
        width={64}
        height={64}
      />
      <Skeleton
        className={[classes.skeleton, classes.login].join(' ')}
        variant="text"
        width={256}
        height={32}
      />
      <Skeleton
        className={classes.skeleton}
        variant="text"
        width={128}
        height={24}
      />
      <Grid className={classes.stats} container justify="center">
        {[...Array(3)].map((_, i) => (
          <div className={classes.headerColumn} key={i}>
            <Skeleton
              className={classes.skeleton}
              variant="text"
              width={64}
              height={18}
            />
            <Skeleton
              className={classes.skeleton}
              variant="text"
              style={{ marginTop: -8 }}
              width={64}
              height={48}
            />
          </div>
        ))}
      </Grid>
      <Skeleton
        className={classes.skeleton}
        variant="text"
        width={256}
        height={22}
      />
      <Skeleton
        className={classes.skeleton}
        variant="text"
        width={200}
        height={18}
      />
      <Skeleton
        className={classes.skeleton}
        variant="text"
        width={164}
        height={18}
      />
    </Paper>
  )
}

export default ProfileSkeleton
