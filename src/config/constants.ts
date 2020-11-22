import { ModeObject } from '../interfaces'
import { UserSettings } from '../interfaces'
import { PaletteType as MUIPaletteType } from '@material-ui/core'

export const API_URL = 'https://m.habr.com/kek/'
export const API_TOKEN_URL = 'https://habr.com/api/'

/**
 * Minimal application width to stay with the drawer
 */
export const MIN_WIDTH = 900

export const POST_IMAGE_HEIGHT = 212

export const RATING_MODES: ModeObject[] = [
  {
    text: 'Все подряд',
    to: '/all',
    mode: 'all',
    isNewMode: true,
    switcherText: 'Все',
  },
  {
    text: 'Новые с рейтингом ≥0',
    to: '/top0',
    mode: 'top0',
    isNewMode: true,
    switcherText: '≥0',
  },
  {
    text: 'Новые с рейтингом ≥10',
    to: '/top10',
    mode: 'top10',
    isNewMode: true,
    switcherText: '≥10',
  },
  {
    text: 'Новые с рейтингом ≥25',
    to: '/top25',
    mode: 'top25',
    isNewMode: true,
    switcherText: '≥25',
  },
  {
    text: 'Новые с рейтингом ≥50',
    to: '/top50',
    mode: 'top50',
    isNewMode: true,
    switcherText: '≥50',
  },
  {
    text: 'Новые с рейтингом ≥100',
    to: '/top100',
    mode: 'top100',
    isNewMode: true,
    switcherText: '≥100',
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

export const HOUR = 1000 * 60 * 60
export const DEFAULT_UPDATE_INTERVAL = HOUR / 4

export const DEFAULT_USER_SETTINGS: UserSettings = {
  theme: 'light',
}

export const THEMES: PaletteType[] = ['light', 'dark', 'oled', 'sepia']

export const BACKGROUND_COLORS_DEFAULT = {
  light: '#fafafa',
  dark: '#121212',
  oled: '#121212',
  sepia: '#f5e2a8',
}

export const BACKGROUND_COLORS_PAPER = {
  light: '#fff',
  dark: '#1d1d1d',
  oled: '#000',
  sepia: '#ffecb3',
}

export const THEME_NAMES = {
  light: 'Светлая тема',
  dark: 'Тёмная тема',
  oled: 'Тема для OLED экранов',
  sepia: 'Ночной режим',
}

export type PaletteType = 'light' | 'dark' | 'oled' | 'sepia'

export const THEME_TYPES: Record<PaletteType, MUIPaletteType> = {
  light: 'light',
  dark: 'dark',
  oled: 'dark',
  sepia: 'light',
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
