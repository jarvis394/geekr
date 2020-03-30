import makeRequest from './makeRequest'
import { APIResponse, News } from '../interfaces'

export default async (page): Promise<APIResponse<News>> =>
  (await makeRequest({
    path: 'articles',
    params: {
      news: 'true',
      page
    },
    version: 1,
  })).data
