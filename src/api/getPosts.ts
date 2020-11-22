import makeRequest from './makeRequest'
import { Posts } from '../interfaces'
import { Mode } from 'src/config/constants'

export const modeParams = {
  all: { sort: 'rating' },
  top0: { sort: 'rating', score: '0' },
  top10: { sort: 'rating', score: '10' },
  top25: { sort: 'rating', score: '25' },
  top50: { sort: 'rating', score: '50' },
  top100: { sort: 'rating', score: '100' },
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
