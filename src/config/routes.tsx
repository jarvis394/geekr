/**
 * If you add a Settings subpage, add its alias to constants.tsx
 * in `makeNavigationTabs`, so SideNavigationDrawer will match a new page
 */

import React, { MemoExoticComponent } from 'react'
import Post from 'src/pages/Post'
import Settings from 'src/pages/Settings/index'
import SettingsAppearance from 'src/pages/Settings/Appearance'
import SettingsBlacklist from 'src/pages/Settings/Blacklist'
import SettingsNewTheme from 'src/pages/Settings/NewTheme'
import SettingsInterface from 'src/pages/Settings/Interface'
import SettingsReader from 'src/pages/Settings/Reader'
import SettingsPrivacy from 'src/pages/Settings/Privacy'
import SettingsImport from 'src/pages/Settings/ImportSettings'
import SettingsLanguage from 'src/pages/Settings/Language'
import Search from 'src/pages/Search'
import News from 'src/pages/News'
import NotFound from 'src/pages/NotFound'
import Thread from 'src/pages/Comments/Thread'
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

export interface Route {
  path: string | string[]
  component: MemoExoticComponent<() => React.ReactElement> | React.ReactElement
  title?: string
  shouldShowAppBar?: boolean
  appBarColor?: (theme: Theme) => string
  shouldAppBarChangeColors?: boolean
  alias: string
}

export const routes: Route[] = [
  {
    path: '/services',
    component: <Services />,
    title: 'Хабы',
    shouldShowAppBar: true,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.default,
    alias: 'services',
  },
  {
    path: '/auth',
    component: <Login />,
    title: 'Авторизация',
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.default,
    alias: 'auth',
  },
  {
    path: '/post/:id/comments/thread/:threadId',
    component: <Thread />,
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.default,
    alias: 'commentsThread',
  },
  {
    path: '/post/:id/comments',
    component: <CommentsPage />,
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.default,
    alias: 'comments',
  },
  {
    path: '/company/:alias/blog/:id/comments',
    component: <CommentsPage />,
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.default,
    alias: 'comments',
  },
  {
    path: '/company/:alias/blog/:id',
    component: <Post />,
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.default,
    alias: 'post',
  },
  {
    path: '/post/:id',
    component: <Post />,
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.default,
    alias: 'post',
  },
  {
    path: '/settings/reader',
    component: <SettingsReader />,
    title: 'Параметры чтения',
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => getContrastPaperColor(theme),
    alias: 'settingsReader',
  },
  {
    path: '/settings/interface',
    component: <SettingsInterface />,
    title: 'Настройки интерфейса',
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => getContrastPaperColor(theme),
    alias: 'settingsInterface',
  },
  {
    path: '/settings/privacy',
    component: <SettingsPrivacy />,
    title: 'Приватность',
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => getContrastPaperColor(theme),
    alias: 'settingsPrivacy',
  },
  {
    path: '/settings/language',
    component: <SettingsLanguage />,
    title: 'Настройки языка',
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => getContrastPaperColor(theme),
    alias: 'settingsLanguage',
  },
  {
    path: '/settings/appearance/new-theme',
    component: <SettingsNewTheme />,
    title: 'Новая тема',
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => getContrastPaperColor(theme),
    alias: 'settingsNewTheme',
  },
  {
    path: '/settings/appearance/edit-theme/:themeType',
    component: <SettingsNewTheme isEditMode />,
    title: 'Изменение темы',
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => getContrastPaperColor(theme),
    alias: 'settingsEditTheme',
  },
  {
    path: '/settings/appearance',
    component: <SettingsAppearance />,
    title: 'Внешний вид',
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => getContrastPaperColor(theme),
    alias: 'settingsAppearance',
  },
  {
    path: '/settings/blacklist',
    component: <SettingsBlacklist />,
    title: 'Чёрный список',
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => getContrastPaperColor(theme),
    alias: 'settingsBlacklist',
  },
  {
    path: '/settings/import',
    component: <SettingsImport />,
    title: 'Импорт настроек',
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => getContrastPaperColor(theme),
    alias: 'settingsBlacklist',
  },
  {
    path: '/settings',
    component: <Settings />,
    title: 'Настройки',
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => getContrastPaperColor(theme),
    alias: 'settings',
  },
  {
    path: '/geekr-about',
    component: <AboutPage />,
    title: 'О проекте',
    shouldShowAppBar: false,
    shouldAppBarChangeColors: true,
    appBarColor: (theme) => theme.palette.background.default,
    alias: 'geekrAbout',
  },
  {
    path: ['/search', '/search/p/:page'],
    component: <Search />,
    title: 'Поиск',
    shouldShowAppBar: true,
    shouldAppBarChangeColors: true,
    appBarColor: (theme) => theme.palette.background.default,
    alias: 'search',
  },
  {
    path: '/hubs/p/:page',
    component: <Hubs />,
    title: 'Хабы',
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.default,
    alias: 'hubs',
  },
  {
    path: '/hub/:alias/companies/p/:page',
    component: <HubCompanies />,
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.default,
    alias: 'hubCompanies',
  },
  {
    path: '/hub/:alias/authors/p/:page',
    component: <HubAuthors />,
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.default,
    alias: 'hubAuthors',
  },
  {
    path: [
      '/hub/:alias/p/:page',
      '/hub/:alias/top0/p/:page',
      '/hub/:alias/top10/p/:page',
      '/hub/:alias/top25/p/:page',
      '/hub/:alias/top50/p/:page',
      '/hub/:alias/top100/p/:page',
      '/hub/:alias/top/daily/p/:page',
      '/hub/:alias/top/weekly/p/:page',
      '/hub/:alias/top/monthly/p/:page',
      '/hub/:alias/top/yearly/p/:page',
      '/hub/:alias/top/alltime/p/:page',
    ],
    component: <Hub />,
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.default,
    alias: 'hub',
  },
  {
    path: '/user/:login/favorites/comments/p/:page',
    component: <UserFavoriteComments />,
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.default,
    alias: 'userFaviritesComments',
  },
  {
    path: '/user/:login/favorites/articles/p/:page',
    component: <UserFavoriteArticles />,
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.default,
    alias: 'userFaviritesArticles',
  },
  {
    path: '/user/:login/comments/p/:page',
    component: <UserComments />,
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.default,
    alias: 'userComments',
  },
  {
    path: '/user/:login/articles/p/:page',
    component: <UserArticles />,
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.default,
    alias: 'userArticles',
  },
  {
    path: '/user/:login',
    component: <User />,
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.default,
    alias: 'user',
  },
  {
    path: '/news/p/:page',
    component: <News />,
    title: 'Новости',
    shouldShowAppBar: true,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.paper,
    alias: 'news',
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
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.paper,
    alias: 'feed',
  },
  {
    path: '/me',
    component: <Me />,
    shouldShowAppBar: true,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.default,
    alias: 'me',
  },
  {
    path: '/',
    component: <Redirect to={`${getCachedMode().to}p/1`} />,
    shouldShowAppBar: true,
    shouldAppBarChangeColors: true,
    appBarColor: (theme) => theme.palette.background.default,
    alias: 'feed',
  },
  {
    path: '/:404*',
    component: <NotFound />,
    title: '404',
    shouldShowAppBar: false,
    shouldAppBarChangeColors: false,
    appBarColor: (theme) => theme.palette.background.default,
    alias: '404',
  },
]
