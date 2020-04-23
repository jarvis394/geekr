import makeRequest from './makeRequest'
import { Posts } from '../interfaces'

export type Mode = 'all' | 'day' | 'week' | 'month'

export const modeParams = {
  all: { sort: 'rating', date: '' },
  day: { date: 'day', sort: 'date' },
  week: { date: 'week', sort: 'date' },
  month: { date: 'month', sort: 'date' },
}

export default async (mode: Mode, page: number): Promise<Posts> =>
  (
    await makeRequest({
      path: 'articles',
      version: 1,
      params: {
        date: modeParams[mode].date,
        sort: modeParams[mode].sort,
        page,
      },
    })
  ).data
