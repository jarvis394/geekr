import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    height: 48,
    position: 'relative',
  },
}))

const Component = () => {
  const classes = useStyles()

  return (
    <AppBar className={classes.root} position="static" elevation={0}>
      <Toolbar style={{ minHeight: 'unset', height: 48 }}>
        <Typography variant="h6">Scroll to see button</Typography>
      </Toolbar>
      <Divider />
    </AppBar>
  )
}

export default Component
