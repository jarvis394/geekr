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
import Login from 'src/pages/Login'

interface Route {
  path: string | string[]
  component: MemoExoticComponent<() => React.ReactElement> | React.ReactElement
  title?: string
}

const routes: Route[] = [
  {
    path: '/auth',
    component: <Login />,
    title: 'Авторизация',
  },
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
    title: 'Настройки',
  },
  {
    path: '/habra-about',
    component: <AboutPage />,
    title: 'О проекте',
  },
  {
    path: ['/search', '/search/p/:page'],
    component: <Search />,
    title: 'Поиск',
  },
  {
    path: '/hubs/p/:page',
    component: <Hubs />,
    title: 'Хабы',
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
    title: 'Новости',
  },
  {
    path: [
      '/all/p/:page',
      '/top0/p/:page',
      '/top10/p/:page',
      '/top25/p/:page',
      '/top50/p/:page',
      '/top100/p/:page',
      '/top/daily/p/:page',
      '/top/weekly/p/:page',
      '/top/monthly/p/:page',
      '/top/yearly/p/:page',
      '/top/alltime/p/:page',
    ],
    component: <Home />,
    title: 'habra.',
  },
  {
    path: '/',
    component: <Redirect to={`${getCachedMode().to}/p/1`} />,
  },
  {
    path: '/:404*',
    component: <NotFound />,
    title: '404',
  },
]

export default routes
