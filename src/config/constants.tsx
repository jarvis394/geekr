import React from 'react'
import { ModeObject, FlowObject } from '../interfaces'
import { UserSettings } from '../interfaces'
import {
  darken,
  fade,
  lighten,
  PaletteType as MUIPaletteType,
} from '@material-ui/core'
import { blue } from '@material-ui/core/colors'
import { Icon28Newsfeed, Icon28SettingsOutline } from '@vkontakte/icons'
import { Icon20HomeOutline } from '@vkontakte/icons'
import { Icon28ServicesOutline } from '@vkontakte/icons'
import { Icon24Search } from '@vkontakte/icons'
import { Icon28Profile } from '@vkontakte/icons'
import TabObject from 'src/interfaces/NavigationTabObject'
import getCachedMode from 'src/utils/getCachedMode'

export const APP_VERSION = 'v2'

export const API_URL = 'https://m.habr.com/kek/'
export const API_TOKEN_URL = 'https://jarvis394-backend.ml/habra/'
export const MATOMO_SERVER_URL = 'https://matomo.jarvis394-backend.ml/'
export const MATOMO_SITE_ID = 2

export const MIN_WIDTH = 960
export const MIDDLE_WIDTH = 1175
export const MAX_WIDTH = 1280

/**
 * Negative threshold for VisibilitySensor in PostItem component
 */
export const POST_ITEM_VISIBILITY_THRESHOLD = -1 * 250

export const POST_IMAGE_HEIGHT = 212
export const ADVERTS_BLOCK_HEIGHT = 128
export const ADVERTS_BLOCK_MAX_WIDTH = 364
export const BOTTOM_BAR_HEIGHT = 52
export const APP_BAR_HEIGHT = 48
export const DRAWER_WIDTH = 296

/** Local Storage keys */
export const USER_SETTINGS_KEY = 'habra_USER_SETTINGS'
export const COOKIES_SNACKBAR_WAS_SHOWN_KEY = 'habra_COOKIES_SNACKBAR_WAS_SHOWN'

export const FLOWS: FlowObject[] = [
  {
    title: 'Моя лента',
    link: '/feed/',
  },
  {
    title: 'Все потоки',
    link: '/all/p/1/',
  },
  {
    title: 'Разработка',
    link: '/flows/develop/',
  },
  {
    title: 'Администрирование',
    link: '/flows/admin/',
  },
  {
    title: 'Дизайн',
    link: '/flows/design/',
  },
  {
    title: 'Менеджмент',
    link: '/flows/management/',
  },
  {
    title: 'Маркетинг',
    link: '/flows/marketing/',
  },
  {
    title: 'Научпоп',
    link: '/flows/popsci/',
  },
]

export const RATING_MODES: ModeObject[] = [
  {
    text: 'Все подряд',
    to: '/all',
    mode: 'all',
    isNewMode: true,
    switcherText: 'Все',
  },
  {
    text: 'Новые с рейтингом +0',
    to: '/top0',
    mode: 'top0',
    isNewMode: true,
    switcherText: '+0',
  },
  {
    text: 'Новые с рейтингом +10',
    to: '/top10',
    mode: 'top10',
    isNewMode: true,
    switcherText: '+10',
  },
  {
    text: 'Новые с рейтингом +25',
    to: '/top25',
    mode: 'top25',
    isNewMode: true,
    switcherText: '+25',
  },
  {
    text: 'Новые с рейтингом +50',
    to: '/top50',
    mode: 'top50',
    isNewMode: true,
    switcherText: '+50',
  },
  {
    text: 'Новые с рейтингом +100',
    to: '/top100',
    mode: 'top100',
    isNewMode: true,
    switcherText: '+100',
  },
  {
    text: 'Лучшее за день',
    to: '/top/daily',
    mode: 'daily',
    switcherText: 'Сутки',
  },
  {
    text: 'Лучшее за неделю',
    to: '/top/weekly',
    mode: 'weekly',
    switcherText: 'Неделя',
  },
  {
    text: 'Лучшее за месяц',
    to: '/top/monthly',
    mode: 'monthly',
    switcherText: 'Месяц',
  },
  {
    text: 'Лучшее за год',
    to: '/top/yearly',
    mode: 'yearly',
    switcherText: 'Год',
  },
  {
    text: 'Лучшее за всё время',
    to: '/top/alltime',
    mode: 'alltime',
    switcherText: 'Всё время',
  },
]

export const POST_LABELS: Record<
  string,
  {
    text: string
    link?: string
  }
> = {
  tutorial: { text: 'Туториал' },
  translation: { text: 'Перевод' },
  sandbox: { text: 'Из песочницы' },
  recovery: { text: 'Recovery' },
  technotext2020: {
    text: '🔥 Технотекст 2020',
    link:
      'https://contenting.io/challenge.html?utm_source=habr&utm_medium=label',
  },
}

export const makeNavigationTabs = (
  w = 24,
  h = 24,
  replaceProfile = false
): TabObject[] => {
  const tabs = [
    {
      label: 'Статьи',
      icon: <Icon20HomeOutline width={w} height={h} />,
      to: () => `${getCachedMode().to}/p/1`,
      match: /\/(all|top(0|10|25|50|100)|top\/daily|top\/weekly|top\/monthly|top\/yearly|top\/alltime)\/p\/([0-9]+)\/?$/,
      tab: 'home',
    },
    {
      label: 'Новости',
      icon: <Icon28Newsfeed width={w} height={h} />,
      to: () => '/news/p/1',
      tab: 'news',
      match: /\/news\/p\/([0-9]+)\/?$/,
    },
    {
      label: 'Хабы',
      icon: <Icon28ServicesOutline width={w} height={h} />,
      to: () => '/services',
      match: /\/services\/?$/,
      tab: 'services',
    },
    {
      label: 'Поиск',
      icon: <Icon24Search width={w} height={h} />,
      to: () => '/search',
      match: /\/search(\/p\/([0-9]+)\/?)?$/,
      tab: 'search',
    },
    {
      label: 'Профиль',
      icon: <Icon28Profile width={w} height={h} />,
      to: () => '/me',
      match: /\/me\/?$/,
      tab: 'me',
    },
  ]
  if (replaceProfile) {
    tabs.splice(
      tabs.findIndex((e) => e.tab == 'me'),
      1,
      {
        label: 'Настройки',
        icon: <Icon28SettingsOutline width={w} height={h} />,
        to: () => '/settings',
        match: /\/settings\/?$/,
        tab: 'settings',
      }
    )
  }
  return tabs
}

export const HOUR = 1000 * 60 * 60
export const DEFAULT_UPDATE_INTERVAL = HOUR / 4
export const chromeAddressBarHeight = 56

export const DEFAULT_USER_SETTINGS: UserSettings = {
  themeType: 'light',
  customThemes: [],
  hiddenAuthors: [],
  hiddenCompanies: [],
  preferredDarkTheme: 'dark',
  preferredLightTheme: 'light',
  autoChangeTheme: false,
  cookiesPreferences: {
    disableCookies: false,
  },
}

export const THEMES: PaletteType[] = [
  'light',
  'dark',
  'oled',
  'sepia',
  'dimmed',
]

/** Colors for app background */
export const BACKGROUND_COLORS_DEFAULT = {
  light: '#f5f5f5',
  dark: '#0e0e0e',
  oled: '#000000',
  sepia: '#f5e2a8',
  dimmed: '#1c2128',
}

/** Colors for app foreground elements, such as Paper */
export const BACKGROUND_COLORS_PAPER = {
  light: '#ffffff',
  dark: '#181818',
  oled: '#0e0e0e',
  sepia: '#ffecb3',
  dimmed: '#252c35',
}

export const THEME_PRIMARY_COLORS = {
  light: {
    main: blue.A400,
    light: blue.A200,
    dark: blue.A700,
  },
  dark: {
    main: blue.A100,
    light: lighten(blue.A100, 0.05),
    dark: darken(blue.A100, 0.1),
  },
  oled: {
    main: blue.A100,
    light: lighten(blue.A100, 0.05),
    dark: darken(blue.A100, 0.1),
  },
  sepia: {
    main: '#679f9d',
    light: lighten('#679f9d', 0.05),
    dark: darken('#679f9d', 0.1),
  },
  dimmed: {
    main: blue.A100,
    light: lighten(blue.A100, 0.05),
    dark: darken(blue.A100, 0.1),
  },
}

export const THEME_TEXT_COLORS = {
  light: {
    primary: 'rgb(0, 0, 0, 0.87)',
    secondary: 'rgb(0, 0, 0, 0.54)',
    disabled: 'rgba(0, 0, 0, 0.38)',
    hint: 'rgba(0, 0, 0, 0.38)',
  },
  dark: {
    primary: '#e9e9e9',
    secondary: fade('#e9e9e9', 0.54),
    disabled: fade('#e9e9e9', 0.38),
    hint: fade('#e9e9e9', 0.38),
  },
  oled: {
    primary: '#e9e9e9',
    secondary: fade('#e9e9e9', 0.54),
    disabled: fade('#e9e9e9', 0.38),
    hint: fade('#e9e9e9', 0.38),
  },
  sepia: {
    primary: '#5b4636',
    secondary: fade('#5b4636', 0.54),
    disabled: fade('#5b4636', 0.38),
    hint: fade('#5b4636', 0.38),
  },
  dimmed: {
    primary: '#cdd9e5',
    secondary: fade('#cdd9e5', 0.54),
    disabled: fade('#cdd9e5', 0.38),
    hint: fade('#cdd9e5', 0.38),
  },
}

export const THEME_NAMES = {
  light: 'Светлая',
  dark: 'Тёмная',
  oled: 'OLED',
  sepia: 'Ночной режим',
  dimmed: 'Ночная тема',
}

export type PaletteType = 'light' | 'dark' | 'oled' | 'sepia' | 'dimmed'

export const THEME_TYPES: Record<PaletteType, MUIPaletteType> = {
  light: 'light',
  dark: 'dark',
  oled: 'dark',
  sepia: 'light',
  dimmed: 'dark',
}

export type Mode =
  | 'all'
  | 'top0'
  | 'top10'
  | 'top25'
  | 'top50'
  | 'top100'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'alltime'
