import * as React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import makeStyles from '@material-ui/core/styles/makeStyles'
import {
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  title: {
    fontSize: 24,
    fontWeight: 500,
    fontFamily: 'Google Sans',
  },
  skeleton: {
    maxWidth: '100%',
    backgroundColor: theme.palette.action.focus,
    borderRadius: 4,
  },
}))

const PostSkeleton = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>Подписан на компании</Typography>
      <List>
        {[...Array(2)].map((_, i) => (
          <ListItem key={i}>
            <ListItemAvatar>
              <Skeleton
                className={classes.skeleton}
                style={{ borderRadius: '50%' }}
                width={40}
                height={40}
                variant="circle"
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Skeleton
                  className={classes.skeleton}
                  width={128}
                  height={22}
                  variant="text"
                />
              }
              secondary={
                <Skeleton
                  className={classes.skeleton}
                  width={256}
                  height={20}
                  variant="text"
                />
              }
            />
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default PostSkeleton
