import makeRequest from './makeRequest'
import { APIResponse, Posts } from '../interfaces'

// TODO: Needs an interface for the returning data
export default async (
  query: string,
  page: number
): Promise<APIResponse<Posts>> =>
  (
    await makeRequest({
      path: 'articles',
      version: 1,
      params: {
        query,
        page,
      },
    })
  ).data
