import * as React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import { ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
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
  link: {
    marginLeft: theme.spacing(1),
  },
}))

const HubAuthorListItemSkeleton = () => {
  const classes = useStyles()

  return (
    <ListItem dense button className={classes.root} alignItems="flex-start">
      <ListItemAvatar>
        <Skeleton
          variant="rect"
          width={40}
          height={40}
          style={{ borderRadius: 4 }}
          className={classes.skeleton}
        />
      </ListItemAvatar>
      <ListItemText
        disableTypography
        primary={
          <Grid container style={{ marginTop: 4 }}>
            <Skeleton
              variant="rect"
              width="50%"
              height={12}
              className={classes.skeleton}
            />
            <Skeleton
              variant="rect"
              width="30%"
              height={12}
              className={[classes.skeleton, classes.link].join(' ')}
            />
          </Grid>
        }
        secondary={
          <>
            <Skeleton
              variant="rect"
              width="40%"
              height={12}
              style={{ marginTop: 8 }}
              className={classes.skeleton}
            />
            <Grid container style={{ marginTop: 12 }} alignItems="center">
              <Skeleton
                variant="circle"
                width={16}
                height={16}
                style={{ borderRadius: '50%' }}
                className={classes.skeleton}
              />
              <Skeleton
                variant="rect"
                width={40}
                height={12}
                style={{ marginLeft: 12 }}
                className={classes.skeleton}
              />
            </Grid>
          </>
        }
      />
    </ListItem>
  )
}

export default React.memo(HubAuthorListItemSkeleton)
