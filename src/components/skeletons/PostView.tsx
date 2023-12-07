import * as React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import getContrastPaperColor from 'src/utils/getContrastPaperColor'
import { MIN_WIDTH } from 'src/config/constants'
import random from 'src/utils/random'

const useStyles = makeStyles((theme) => ({
  root: {
    background: getContrastPaperColor(theme),
    borderRadius: 0,
    overflow: 'auto',
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.up(MIN_WIDTH)]: {
      background: theme.palette.background.paper,
      borderRadius: 8,
    },
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
          <Grid
            container
            direction="row"
            alignItems="center"
            style={{ marginTop: 16 }}
          >
            <Skeleton
              variant="circle"
              width={20}
              height={20}
              className={classes.skeleton}
            />
            <Skeleton
              variant="text"
              style={{ marginLeft: 8 }}
              width={96}
              height={20}
              className={classes.skeleton}
            />
            <Skeleton
              variant="text"
              style={{ marginLeft: 8 }}
              width={148}
              height={20}
              className={classes.skeleton}
            />
          </Grid>
          <Skeleton
            variant="text"
            width="100%"
            className={classes.skeleton}
            style={{ marginTop: 8 }}
            height={36}
          />
          <Skeleton
            variant="text"
            width="75%"
            className={classes.skeleton}
            height={36}
            style={{ marginTop: -4 }}
          />
          <Skeleton
            variant="text"
            width="90%"
            className={classes.skeleton}
            height={24}
            style={{ marginTop: 8 }}
          />
          <Skeleton
            variant="rect"
            width="100%"
            className={classes.skeleton}
            style={{ marginTop: 24, marginBottom: 16 }}
            height={196}
          />
          {Array(20)
            .fill(null)
            .map((_, i) => (
              <Skeleton
                variant="rect"
                width={random(85, 100).toString() + '%'}
                style={{ marginTop: 8 }}
                className={classes.skeleton}
                height={12}
                key={i}
              />
            ))}
        </Grid>
      </Container>
    </div>
  )
}

export default React.memo(PostSkeleton)
