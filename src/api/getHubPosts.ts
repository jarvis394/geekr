import makeRequest from './makeRequest'
import { AuthorizedRequestParams, Posts } from '../interfaces'
import { Mode } from 'src/config/constants'

export const modeParams = {
  all: { sort: 'all' },
  top0: { sort: 'all', score: '0' },
  top10: { sort: 'all', score: '10' },
  top25: { sort: 'all', score: '25' },
  top50: { sort: 'all', score: '50' },
  top100: { sort: 'all', score: '100' },
  daily: { period: 'daily', sort: 'date' },
  weekly: { period: 'weekly', sort: 'date' },
  monthly: { period: 'monthly', sort: 'date' },
  yearly: { period: 'yearly', sort: 'date' },
  alltime: { period: 'alltime', sort: 'date' },
}

interface Params {
  mode: Mode
  page: number
  alias: string
  authData?: AuthorizedRequestParams
}

export default async ({ mode, page, alias, authData }: Params) =>
  await makeRequest<Posts>({
    path: 'articles',
    version: 2,
    params: {
      ...modeParams[mode],
      page: page.toString(),
      hub: alias,
    },
    authData,
  })
