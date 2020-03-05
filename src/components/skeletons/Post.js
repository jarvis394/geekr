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
    width: '100%',
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
          xs={12}
          style={{ marginBottom: 8 }}
        >
          <Skeleton
            variant="circle"
            width={20}
            height={20}
            animation="wave"
            style={{ marginRight: 8 }}
          />
          <Skeleton
            variant="text"
            width={128}
            style={{ maxWidth: '100%' }}
            height={20}
            animation="wave"
          />
        </Grid>
        <Grid item xs={12}>
          <Skeleton
            variant="rect"
            width={512}
            style={{ maxWidth: '100%' }}
            height={20}
            animation="wave"
          />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default PostSkeleton
