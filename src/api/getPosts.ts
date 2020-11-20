import makeRequest from './makeRequest'
import { Posts } from '../interfaces'

export type Mode = 'all' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'alltime'

export const modeParams = {
  all: { sort: 'rating', date: '' },
  daily: { period: 'daily', sort: 'date' },
  weekly: { period: 'weekly', sort: 'date' },
  monthly: { period: 'monthly', sort: 'date' },
  yearly: { period: 'yearly', sort: 'date' },
  alltime: { period: 'alltime', sort: 'date' },
}

export default async (mode: Mode, page: number): Promise<Posts> =>
  (
    await makeRequest({
      path: 'articles',
      version: 2,
      params: {
        ...modeParams[mode],
        page,
      },
    })
  ).data
