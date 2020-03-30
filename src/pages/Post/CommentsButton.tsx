import React from 'react'
import { Button, makeStyles } from '@material-ui/core'
import { useHistory } from 'react-router'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: theme.spacing(6)
  },
  button: {
    height: '100%',
    borderRadius: 0
  }
}))

const CommentsButton = ({ id }: { id: number | string }) => {
  const history = useHistory()
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Button
        disableElevation
        fullWidth
        className={classes.button}
        color="primary"
        onClick={() => history.push('/article/' + id + '/comments')}
      >
        Комментарии
      </Button>
    </div>
  )
}

export default CommentsButton
