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
import TabObject from 'src/interfaces/NavigationTabObject'
import getCachedMode from 'src/utils/getCachedMode'

export const APP_VERSION = 'v2'

export const API_URL = 'https://habr.com/kek/'
export const API_TOKEN_URL = 'https://habra.jarvis394.ml/'
export const MATOMO_SERVER_URL = 'https://matomo.jarvis394.ml/'
export const MATOMO_SITE_ID = 2
export const SENTRY_DSN =
  'https://a2e39aec97c844269660ef4e0db0c264@o929832.ingest.sentry.io/5878570'

export const MIN_WIDTH = 960
export const MIDDLE_WIDTH = 1175
export const MAX_WIDTH = 1280

/**
 * Negative threshold for VisibilitySensor in PostItem component
 */
export const POST_ITEM_VISIBILITY_THRESHOLD = -1 * 500

export const POST_IMAGE_HEIGHT = 212
export const DEFAULT_POST_ITEM_HEIGHT = 390
export const ADVERTS_BLOCK_HEIGHT = 128
export const ADVERTS_BLOCK_MAX_WIDTH = 364
export const BOTTOM_BAR_HEIGHT = 52
export const APP_BAR_HEIGHT = 48
export const DRAWER_WIDTH = 296
export const THREAD_LEVEL = 7

/** Local Storage keys */
export const USER_SETTINGS_KEY = 'habra_USER_SETTINGS'
export const COLLAPSED_COMMENTS_IDS_KEY = 'habra_COLLAPSED_COMMENTS_IDS'
export const NEEDS_UPDATE_KEY = 'habra_NEEDS_UPDATE'
export const AUTH_DATA_KEY = 'habra_AUTH_DATA'
export const CSRF_TOKEN_KEY = 'habra_CSRF_TOKEN'
export const REBRANDING_MODAL_WAS_SHOWN = 'habra_rebranding'
export const RUVDS_MODAL_WAS_SHOWN = 'habra_ruvds_promo'
export const HALLOWEEN_MODAL_WAS_SHOWN = 'habra_halloween'

export const FLOWS: FlowObject[] = [
  {
    title: 'Все потоки',
    alias: 'all',
  },
  {
    title: 'Разработка',
    alias: 'develop',
  },
  {
    title: 'Администрирование',
    alias: 'admin',
  },
  {
    title: 'Дизайн',
    alias: 'design',
  },
  {
    title: 'Менеджмент',
    alias: 'management',
  },
  {
    title: 'Маркетинг',
    alias: 'marketing',
  },
  {
    title: 'Научпоп',
    alias: 'popsci',
  },
  {
    title: 'Моя лента',
    alias: 'feed',
  },
]

export const RATING_MODES: ModeObject[] = [
  {
    text: 'Все подряд',
    to: '/all/',
    mode: 'all',
    isNewMode: true,
    switcherText: 'Все',
  },
  {
    text: 'Новые с рейтингом +0',
    to: '/top0/',
    mode: 'top0',
    isNewMode: true,
    switcherText: '+0',
  },
  {
    text: 'Новые с рейтингом +10',
    to: '/top10/',
    mode: 'top10',
    isNewMode: true,
    switcherText: '+10',
  },
  {
    text: 'Новые с рейтингом +25',
    to: '/top25/',
    mode: 'top25',
    isNewMode: true,
    switcherText: '+25',
  },
  {
    text: 'Новые с рейтингом +50',
    to: '/top50/',
    mode: 'top50',
    isNewMode: true,
    switcherText: '+50',
  },
  {
    text: 'Новые с рейтингом +100',
    to: '/top100/',
    mode: 'top100',
    isNewMode: true,
    switcherText: '+100',
  },
  {
    text: 'Лучшее за день',
    to: '/top/daily/',
    mode: 'daily',
    switcherText: 'Сутки',
  },
  {
    text: 'Лучшее за неделю',
    to: '/top/weekly/',
    mode: 'weekly',
    switcherText: 'Неделя',
  },
  {
    text: 'Лучшее за месяц',
    to: '/top/monthly/',
    mode: 'monthly',
    switcherText: 'Месяц',
  },
  {
    text: 'Лучшее за год',
    to: '/top/yearly/',
    mode: 'yearly',
    switcherText: 'Год',
  },
  {
    text: 'Лучшее за всё время',
    to: '/top/alltime/',
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

export const DONATION_LINKS_MAP = {
  paymentYandexMoney: 'https://money.yandex.ru/to/',
  paymentPayPalMe: 'https://www.paypal.me/',
  paymentWebmoney: 'https://pay.web.money/',
}
export const DONATION_TITLES_MAP = {
  paymentYandexMoney: 'YooMoney',
  paymentPayPalMe: 'PayPal.Me',
  paymentWebmoney: 'Webmoney',
}

export const HABR_BASE_REGEXP = /(habr|m\.habr)\.com\/(ru|en)\/(.+)/
export const HABR_LINKS_REPLACE_MAP = [
  {
    regexp: /company\/?(.+)\/blog\/([0-9]+)[/]?/,
    to: '/company/[0]/blog/[1]',
  },
  {
    regexp: /post\/?(.+)[/]?/,
    to: '/post/[0]',
  },
  {
    regexp: /news\/t\/?(.+)[/]?/,
    to: '/post/[0]',
  },
]

export const READER_FONT_FAMILIES = ['Roboto', 'Segoe UI', 'Arial']

export const makeNavigationTabs = (
  w = 24,
  h = 24,
  replaceProfile = false
): TabObject[] => {
  const tabs: TabObject[] = [
    {
      label: 'Статьи',
      icon: <Icon20HomeOutline width={w} height={h} />,
      to: () => `${getCachedMode().to}p/1`,
      match: 'feed',
      tab: 'home',
    },
    {
      label: 'Новости',
      icon: <Icon28Newsfeed width={w} height={h} />,
      to: () => '/news/p/1',
      tab: 'news',
      match: 'news',
    },
    {
      label: 'Сервисы',
      icon: <Icon28ServicesOutline width={w} height={h} />,
      to: () => '/services',
      match: 'services',
      tab: 'services',
    },
    {
      label: 'Поиск',
      icon: <Icon24Search width={w} height={h} />,
      to: () => '/search',
      match: 'search',
      tab: 'search',
    },
  ]
  if (replaceProfile) {
    tabs.push({
      label: 'Настройки',
      icon: <Icon28SettingsOutline width={w} height={h} />,
      to: () => '/settings',
      match: [
        'settings',
        'settingsAppearance',
        'settingsInterface',
        'settingsPrivacy',
        'settingsNewTheme',
        'settingsEditTheme',
        'settingsBlacklist',
        'settingsReader',
        'settingsLanguage',
      ],
      tab: 'settings',
    })
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
  readerSettings: {
    fontFamily: 'Roboto',
    fontSize: 16,
    changeLinks: false,
    replaceImagesWithPlaceholder: false,
  },
  interfaceFeed: {
    isCompact: false,
    hideMegaposts: false,
    hideNewsBlock: false,
    disablePostImage: false,
    openPostsInNewTab: false,
  },
  interfaceComments: {
    showThreads: true,
    sortByKarma: false,
  },
  language: {
    feed: 'ru',
    interface: 'ru',
  },
}

export const LANGUAGES_INTERFACE = [
  {
    type: 'ru',
    name: 'Русский',
  },
  {
    type: 'en',
    name: 'English',
  },
]
export const LANGUAGES_FEED = [
  {
    type: 'ru',
    name: 'Русский',
  },
  {
    type: 'en',
    name: 'English',
  },
  {
    type: 'ru,en',
    name: 'Русский и English',
  },
]

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

export type PaletteType =
  | 'light'
  | 'dark'
  | 'oled'
  | 'sepia'
  | 'dimmed'

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
