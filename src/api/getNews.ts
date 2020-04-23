import makeRequest from './makeRequest'
import { Posts } from '../interfaces'

export default async (page: number): Promise<Posts> =>
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
