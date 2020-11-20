import { Mode } from '../api/getPosts'
import { UserSettings } from '../interfaces'
import { PaletteType as MUIPaletteType } from '@material-ui/core'

export const API_URL = 'https://m.habr.com/kek/'
export const API_TOKEN_URL = 'https://habr.com/api/'

/**
 * Minimal application width to stay with the drawer
 */
export const MIN_WIDTH = 900

export const POST_IMAGE_HEIGHT = 212

export const MODES: { text: string; to: string; mode: Mode }[] = [
  {
    text: 'Все подряд',
    to: '/all',
    mode: 'all',
  },
  {
    text: 'Лучшее за день',
    to: '/top/daily',
    mode: 'daily',
  },
  {
    text: 'Лучшее за неделю',
    to: '/top/weekly',
    mode: 'weekly',
  },
  {
    text: 'Лучшее за месяц',
    to: '/top/monthly',
    mode: 'monthly',
  },
  {
    text: 'Лучшее за год',
    to: '/top/yearly',
    mode: 'yearly',
  },
  {
    text: 'Лучшее за всё время',
    to: '/top/alltime',
    mode: 'alltime',
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
