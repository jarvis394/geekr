import React, { MemoExoticComponent } from 'react'
import Home from 'src/pages/Home/index'
import Post from 'src/pages/Post'
import Settings from 'src/pages/Settings'
import Search from 'src/pages/Search'
import News from 'src/pages/News'
import NotFound from 'src/pages/NotFound'
import CommentsPage from 'src/pages/Comments'
import getCachedMode from 'src/utils/getCachedMode'
import AboutPage from 'src/pages/AboutPage'
import Hubs from 'src/pages/Hubs/index'
import User from 'src/pages/User/index'
import { Redirect } from 'react-router'

interface Route {
  path: string | string[]
  component: MemoExoticComponent<() => React.ReactElement> | React.ReactElement
}

const routes: Route[] = [
  {
    path: '/post/:id/comments',
    component: <CommentsPage />,
  },
  {
    path: '/post/:id',
    component: <Post />,
  },
  {
    path: '/settings',
    component: <Settings />,
  },
  {
    path: '/habra-about',
    component: <AboutPage />,
  },
  {
    path: ['/search', '/search/p/:page'],
    component: <Search />,
  },
  {
    path: '/hubs/p/:page',
    component: <Hubs />,
  },
  {
    path: '/user/:login/favorites/comments/:page',
    component: <User path="favoritesComments" />,
  },
  {
    path: '/user/:login/favorites/articles/:page',
    component: <User path="favoritesArticles" />,
  },
  {
    path: '/user/:login/comments/:page',
    component: <User path="comments" />,
  },
  {
    path: '/user/:login/articles/:page',
    component: <User path="articles" />,
  },
  {
    path: '/user/:login',
    component: <User path="profile" />,
  },
  {
    path: '/news/p/:page',
    component: <News />,
  },
  {
    path: [
      '/all/p/:page',
      '/top/day/p/:page',
      '/top/week/p/:page',
      '/top/month/p/:page',
    ],
    component: <Home />,
  },
  {
    path: '/',
    component: <Redirect to={`/${getCachedMode()}/p/1`} />,
  },
  {
    path: '*',
    component: <NotFound />,
  },
]

export default routes
