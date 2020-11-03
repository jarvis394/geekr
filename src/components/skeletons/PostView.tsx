import * as React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.paper,
    borderRadius: 0,
    overflow: 'auto',
    paddingBottom: theme.spacing(2),
  },
  hubs: {
    background: theme.palette.background.default,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    height: 40,
    display: 'flex',
    alignItems: 'center',
  },
  skeleton: {
    maxWidth: '100%',
    backgroundColor: theme.palette.action.hover,
    borderRadius: 4,
  },
}))

const PostSkeleton = () => {
  const classes = useStyles()

  return (
    <div>
      <Container className={classes.root}>
        <Grid container>
          <Grid container direction="row" style={{ marginTop: 16 }}>
            <Grid item>
              <Skeleton
                variant="circle"
                width={20}
                height={20}
                className={classes.skeleton}
              />
            </Grid>
            <Grid item>
              <Skeleton
                variant="text"
                style={{ marginLeft: 8 }}
                width={186}
                height={18}
                className={classes.skeleton}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Skeleton
              variant="text"
              width="100%"
              className={classes.skeleton}
              style={{ marginTop: 16 }}
              height={28}
            />
          </Grid>
          <Grid item xs={12}>
            <Skeleton
              variant="text"
              width="75%"
              className={classes.skeleton}
              height={28}
              style={{ marginTop: 8 }}
            />
          </Grid>
          <Grid item xs={12}>
            <Skeleton
              variant="rect"
              width="100%"
              className={classes.skeleton}
              style={{ marginTop: 24, marginBottom: 16 }}
              height={196}
            />
          </Grid>
          {Array(20)
            .fill(null)
            .map((_, i) => (
              <Grid key={i} item xs={12}>
                <Skeleton
                  variant="rect"
                  width={'100%'}
                  style={{ marginTop: 8 }}
                  className={classes.skeleton}
                  height={12}
                />
              </Grid>
            ))}
        </Grid>
      </Container>
    </div>
  )
}

export default PostSkeleton
