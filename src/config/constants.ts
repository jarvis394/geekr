import { Mode } from '../api/getPosts'
import { UserSettings } from '../interfaces'
import { blue } from '@material-ui/core/colors'

export const API_URL = 'https://m.habr.com/kek/'

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
    to: '/top/day',
    mode: 'day',
  },
  {
    text: 'Лучшее за неделю',
    to: '/top/week',
    mode: 'week',
  },
  {
    text: 'Лучшее за месяц',
    to: '/top/month',
    mode: 'month',
  },
]

export const HOUR = 1000 * 60 * 60
export const DEFAULT_UPDATE_INTERVAL = 1000

export const DEFAULT_USER_SETTINGS: UserSettings = {
  theme: 'light',
  separateCommentsPage: true,
  primaryColor: blue,
  cacheUpdateInterval: HOUR,
}
