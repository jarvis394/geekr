import makeRequest from './makeRequest'
import { Posts } from '../interfaces'

// TODO: Needs an interface for the returning data
export default async (
  query: string,
  page: number,
  order: 'relevance' | 'date' | 'rating'
): Promise<Posts> =>
  (
    await makeRequest({
      path: 'articles',
      version: 2,
      params: {
        query,
        page,
        order,
      },
    })
  ).data
