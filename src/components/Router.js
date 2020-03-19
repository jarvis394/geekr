import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import makeStyles from '@material-ui/styles/makeStyles'
import Home from '../pages/Home'
import Post from '../pages/Post'
import Settings from '../pages/Settings'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.type === 'dark' ? '#0d0d0d' : '#f2f4f6',
    color: theme.palette.text.primary,
    margin: 0,
    fontFamily: '-apple-system, BlinkMacSystemFont, Arial, sans-serif',
    lineHeight: 1.5
  }
}))

const Router = ({ state, setState }) => {
  const classes = useStyles()

  // Set root classes
  document.body.className = classes.root

  const getCachedMode = () => {
    const modes = {
      all: 'all',
      day: 'top/day',
      week: 'top/week',
      month: 'top/month'
    }
    const mode = localStorage.getItem('mode')

    if (!mode) {
      localStorage.setItem('mode', 'all')
      return 'all'
    } else return modes[mode]
  }

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
        <Route exact path={['/all/page/:page', '/top/day/page/:page', '/top/week/page/:page', '/top/month/page/:page']}>
          <Home state={state} setState={setState} />
        </Route>

        {/* Redirect from home to the PageView */}
        <Route exact path="/">
          <Redirect to={`/${getCachedMode()}/page/1`} />
        </Route>
      </Switch>
    </>
  )
}

export default Router
