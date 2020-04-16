import makeRequest from 'src/api/makeRequest'
import { APIResponse, Posts } from 'src/interfaces'

export default async (login: string, page: number): Promise<APIResponse<Posts>> =>
  (
    await makeRequest({
      path: 'articles',
      params: {
        user: login,
        'user_bookmarks': 'true',
        page
      },
      version: 1,
    })
  ).data
