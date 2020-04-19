import * as React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import makeStyles from '@material-ui/styles/makeStyles'
import Home from '../pages/Home/index'
import Post from '../pages/Post'
import Settings from '../pages/Settings'
import Search from '../pages/Search'
import News from '../pages/News'
import NotFound from '../pages/NotFound'
import { Theme, lighten, darken } from '@material-ui/core/styles'
import CommentsPage from '../pages/Comments'
import Tabs from './blocks/Tabs/RouterTabs'
import getCachedMode from '../utils/getCachedMode'
import FAQ from 'src/pages/FAQ'
import Hubs from 'src/pages/Hubs/index'
import User from 'src/pages/User/index'
import generateTheme from 'src/config/theme'

const configTheme = generateTheme()
const isDarkTheme = (t: typeof configTheme) => t.palette.type === 'dark'
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.type === 'dark' ? '#0d0d0d' : '#f2f4f6',
    color: theme.palette.text.primary,
    margin: 0,
    fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, Arial, sans-serif',
    lineHeight: 1.5,
    '&::-webkit-scrollbar': {
      width: 15,
      height: 10,
      background: isDarkTheme(theme)
        ? lighten(theme.palette.background.default, 0.03)
        : theme.palette.background.paper,
      border: '1px solid ' + darken(theme.palette.background.paper, 0.05),
    },
    '&::-webkit-scrollbar-thumb': {
      minHeight: 28,
      background: isDarkTheme(theme)
        ? lighten(theme.palette.background.paper, 0.08)
        : darken(theme.palette.background.paper, 0.08),
      transition: '0.1s',
      '&:hover': {
        background: isDarkTheme(theme)
          ? lighten(theme.palette.background.paper, 0.1)
          : darken(theme.palette.background.paper, 0.1),
      },
      '&:active': {
        background: isDarkTheme(theme)
          ? lighten(theme.palette.background.paper, 0.2)
          : darken(theme.palette.background.paper, 0.2),
      },
    },
  },
}))

const Router = () => {
  const classes = useStyles()

  // Set root classes
  document.body.className = classes.root

  return (
    <>
      <Tabs />
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
          <Settings />
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

        {/* User's favorites comments */}
        <Route exact path="/user/:login/favorites/comments/:page">
          <User path="favorites/comments" />
        </Route>

        {/* User's favorites articles */}
        <Route exact path="/user/:login/favorites/articles/:page">
          <User path="favorites/articles" />
        </Route>

        {/* User's comments */}
        <Route exact path="/user/:login/comments/:page">
          <User path="comments" />
        </Route>

        {/* User's articles */}
        <Route exact path="/user/:login/articles/:page">
          <User path="articles" />
        </Route>

        {/* User */}
        <Route exact path="/user/:login">
          <User path="profile" />
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
    </>
  )
}

export default Router
