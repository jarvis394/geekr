import * as React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import makeStyles from '@material-ui/styles/makeStyles'
import Home from '../pages/Home/index'
import Post from '../pages/Post'
import Settings from '../pages/Settings'
import Search from '../pages/Search'
import News from '../pages/News'
import NotFound from '../pages/NotFound'
import { Theme } from '@material-ui/core/styles'
import CommentsPage from '../pages/Comments'
import Tabs from './blocks/Tabs'
import getCachedMode from '../utils/getCachedMode'
import FAQ from 'src/pages/FAQ'
import Hubs from 'src/pages/Hubs/index'
import User from 'src/pages/User/index'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.type === 'dark' ? '#0d0d0d' : '#f2f4f6',
    color: theme.palette.text.primary,
    margin: 0,
    fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, Arial, sans-serif',
    lineHeight: 1.5,
  },
}))

const Router = ({ state, setState }) => {
  const classes = useStyles()

  // Set root classes
  document.body.className = classes.root

  return (
    <Tabs>
      <Switch>
        {/* Comments */}
        <Route exact path="/article/:id/comments">
          <CommentsPage />
        </Route>

        {/* Article */}
        <Route exact path="/article/:id">
          <Post />
        </Route>

        {/* Settings */}
        <Route exact path="/settings">
          <Settings state={state} setState={setState} />
        </Route>

        {/* FAQ */}
        <Route exact path="/habra-faq">
          <FAQ />
        </Route>

        {/* Search */}
        <Route exact path={['/search', '/search/p/:page']}>
          <Search />
        </Route>

        {/* Hubs */}
        <Route exact path="/hubs/p/:page">
          <Hubs />
        </Route>

        {/* User */}
        <Route exact path="/user/:login">
          <User />
        </Route>

        {/* News */}
        <Route exact path="/news/p/:page">
          <News />
        </Route>

        {/* Home */}
        <Route
          exact
          path={[
            '/all/p/:page',
            '/top/day/p/:page',
            '/top/week/p/:page',
            '/top/month/p/:page',
          ]}
        >
          <Home />
        </Route>

        {/* Redirect from home to the Home component */}
        <Route exact path="/">
          <Redirect to={`/${getCachedMode()}/p/1`} />
        </Route>

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Tabs>
  )
}

export default Router
