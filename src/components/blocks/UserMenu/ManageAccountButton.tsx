import { Button, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(2)
  },
  button: {
    borderRadius: 50,
    textTransform: 'none',
    fontFamily: 'Google Sans',
    padding: '2px 15px',
    letterSpacing: '.04rem'
  },
}))

const ManageAccountButton = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Button className={classes.button} variant="outlined">
        Управление профилем
      </Button>
    </div>
  )
}

export default React.memo(ManageAccountButton)
