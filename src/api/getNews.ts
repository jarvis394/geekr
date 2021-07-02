import makeRequest from './makeRequest'
import { FlowAlias, Posts } from '../interfaces'

export default async (page: number, flow: FlowAlias = 'all') =>
  await makeRequest<Posts>({
    path: 'articles',
    params: flow === 'all' ? {
      news: 'true',
      page: page.toString(),
    } : {
      flowNews: 'true',
      page: page.toString(),
      flow,
    },
    version: 2,
  })
