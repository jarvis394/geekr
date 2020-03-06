import React, { useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Home from '../pages/Home'
import Post from '../pages/Post'
import Settings from '../pages/Settings'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
}))

const App = ({ state, setState }) => {
  const classes = useStyles()

  // Set root classes
  document.body.className = classes.root

  return (
    <>
      <Switch>
        {/* Article */}
        <Route exact path="/article/:id">
          <Post state={state} setState={setState} />
        </Route>

        {/* Home */}
        <Route exact path="/settings">
          <Settings state={state} setState={setState} />
        </Route>

        {/* Home */}
        <Route exact path="/">
          <Home state={state} setState={setState} />
        </Route>
      </Switch>
    </>
  )
}

export default App
