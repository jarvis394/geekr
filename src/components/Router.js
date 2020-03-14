import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
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

const Router = ({ state, setState }) => {
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

        {/* Settings */}
        <Route exact path="/settings">
          <Settings state={state} setState={setState} />
        </Route>

        {/* PageView */}
        <Route exact path="/page/:page">
          <Home state={state} setState={setState} />
        </Route>

        {/* Redirect from home to the PageView */}
        <Route exact path="/">
          <Redirect to="/page/1" />
        </Route>
      </Switch>
    </>
  )
}

export default Router
