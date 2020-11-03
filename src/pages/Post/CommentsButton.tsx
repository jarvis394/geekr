import React from 'react'
import { Button, makeStyles, Typography } from '@material-ui/core'
import { useHistory } from 'react-router'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: theme.spacing(6),
  },
  button: {
    height: '100%',
    borderRadius: 0,
  },
  count: {
    marginLeft: theme.spacing(1),
    fontWeight: 500,
    fontSize: 14,
  },
  chatIcon: {
    fontSize: 16,
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
}))

const CommentsButton = ({
  id,
  className,
  count,
}: {
  id: number | string
  className?: string
  count: number
}) => {
  const history = useHistory()
  const classes = useStyles()

  return (
    <div className={classes.root + ' ' + className}>
      <Button
        disableElevation
        fullWidth
        className={classes.button}
        color="default"
        onClick={() => history.push('/post/' + id + '/comments')}
      >
        <ChatBubbleIcon className={classes.chatIcon} />
        Комментарии
        <Typography className={classes.count} color="primary">
          {count}
        </Typography>
      </Button>
    </div>
  )
}

export default CommentsButton
