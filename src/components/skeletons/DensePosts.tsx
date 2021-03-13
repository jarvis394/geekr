import * as React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import getContrastPaperColor from 'src/utils/getContrastPaperColor'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    background: getContrastPaperColor(theme),
    borderRadius: 0,
  },
  skeleton: {
    backgroundColor: theme.palette.action.hover,
    borderRadius: 4,
  },
  padding: {
    padding: theme.spacing(2),
  },
  holder: {
    width: '100%',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}))

const DensePostsSkeleton = ({ n = 3 }: { n?: number }) => {
  const classes = useStyles()

  return (
    <>
      {new Array(n).fill(null).map((_, i) => (
        <Paper key={i} elevation={0} className={classes.root}>
          <Grid container>
            <Skeleton
              variant="text"
              width={128}
              className={classes.skeleton}
              height={20}
            />
            <Grid container>
              <Grid item xs={12}>
                <Skeleton
                  variant="rect"
                  width="90%"
                  className={classes.skeleton}
                  height={14}
                  style={{ marginTop: 8 }}
                />
              </Grid>
              <Grid item xs={12}>
                <Skeleton
                  variant="rect"
                  width="55%"
                  className={classes.skeleton}
                  height={14}
                  style={{ marginTop: 12 }}
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
                        style={{ marginTop: 16 }}
                        className={classes.skeleton}
                        height={18}
                      />
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </>
  )
}

export default React.memo(DensePostsSkeleton)
