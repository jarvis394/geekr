import makeRequest from './makeRequest'
import { APIResponse, Posts } from '../interfaces'

export default async (page: number): Promise<APIResponse<Posts>> =>
  (
    await makeRequest({
      path: 'articles',
      params: {
        news: 'true',
        page,
      },
      version: 1,
    })
  ).data
