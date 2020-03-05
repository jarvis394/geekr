import React from 'react'
import { Switch, Route } from 'react-router-dom'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Home from '../pages/Home'
import Post from '../pages/Post'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
}))

const App = () => {
  const classes = useStyles()

  // Set root classes
  document.body.className = classes.root

  return (
    <>
      <Switch>
        {/* Post; 'a' stands for article here */}
        <Route path="/a/:id">
          <Post />
        </Route>

        {/* Home */}
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </>
  )
}

export default App
