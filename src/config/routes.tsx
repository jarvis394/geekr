import React, { MemoExoticComponent } from 'react'
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
import { Theme } from '@material-ui/core'
import Services from 'src/pages/Services'
import Home from 'src/pages/Home/index'
import Me from 'src/pages/Me'
import UserArticles from 'src/pages/User/pages/Articles'
import UserComments from 'src/pages/User/pages/Comments'
import UserFavoriteArticles from 'src/pages/User/pages/FavArticles'
import UserFavoriteComments from 'src/pages/User/pages/FavComments'
import getContrastPaperColor from 'src/utils/getContrastPaperColor'
import Hub from 'src/pages/Hub/index'
import HubAuthors from 'src/pages/Hub/pages/Authors'
import HubCompanies from 'src/pages/Hub/pages/Companies'

interface Route {
  path: string | string[]
  component: MemoExoticComponent<() => React.ReactElement> | React.ReactElement
  title?: string
  shouldShowAppBar?: boolean
  appBarColor?: (theme: Theme) => string
  shouldAppBarChangeColors?: boolean
}

const routes: Route[] = [
  {
    path: '/services',
    component: <Services />,
    title: 'Хабы',
    shouldShowAppBar: true,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.default,
  },
  {
    path: '/auth',
    component: <Login />,
    title: 'Авторизация',
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.default,
  },
  {
    path: '/post/:id/comments',
    component: <CommentsPage />,
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.default,
  },
  {
    path: '/company/:alias/blog/:id/comments',
    component: <CommentsPage />,
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.default,
  },
  {
    path: '/company/:alias/blog/:id',
    component: <Post />,
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.default,
  },
  {
    path: '/post/:id',
    component: <Post />,
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.default,
  },
  {
    path: '/settings',
    component: <Settings />,
    title: 'Настройки',
    shouldShowAppBar: true,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => getContrastPaperColor(theme),
  },
  {
    path: '/habra-about',
    component: <AboutPage />,
    title: 'О проекте',
    shouldShowAppBar: false,
    shouldAppBarChangeColors: true,
    appBarColor: (theme) => theme.palette.background.default,
  },
  {
    path: ['/search', '/search/p/:page'],
    component: <Search />,
    title: 'Поиск',
    shouldShowAppBar: true,
    shouldAppBarChangeColors: true,
    appBarColor: (theme) => theme.palette.background.default,
  },
  {
    path: '/hubs/p/:page',
    component: <Hubs />,
    title: 'Хабы',
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.default,
  },
  {
    path: '/hub/:alias/companies/p/:page',
    component: <HubCompanies />,
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.default,
  },
  {
    path: '/hub/:alias/authors/p/:page',
    component: <HubAuthors />,
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.default,
  },
  {
    path: '/hub/:alias/p/:page',
    component: <Hub />,
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.default,
  },
  {
    path: '/user/:login/favorites/comments/p/:page',
    component: <UserFavoriteComments />,
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.default,
  },
  {
    path: '/user/:login/favorites/articles/p/:page',
    component: <UserFavoriteArticles />,
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.default,
  },
  {
    path: '/user/:login/comments/p/:page',
    component: <UserComments />,
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.default,
  },
  {
    path: '/user/:login/articles/p/:page',
    component: <UserArticles />,
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.default,
  },
  {
    path: '/user/:login',
    component: <User />,
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.default,
  },
  {
    path: '/news/p/:page',
    component: <News />,
    title: 'Новости',
    shouldShowAppBar: true,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.paper,
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
    shouldShowAppBar: true,
    shouldAppBarChangeColors: true,
  },
  {
    path: '/me',
    component: <Me />,
    shouldShowAppBar: true,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.default,
  },
  {
    path: '/',
    component: <Redirect to={`${getCachedMode().to}/p/1`} />,
    shouldShowAppBar: true,
    shouldAppBarChangeColors: true,
    appBarColor: (theme) => theme.palette.background.default,
  },
  {
    path: '/:404*',
    component: <NotFound />,
    title: '404',
    shouldShowAppBar: true,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.default,
  },
]

export default routes
