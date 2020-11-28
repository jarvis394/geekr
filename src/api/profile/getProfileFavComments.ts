import makeRequest from 'src/api/makeRequest'
import { APIResponse, Comments } from 'src/interfaces'

export default async (
  login: string,
  page: number
): Promise<APIResponse<Comments>> =>
  (
    await makeRequest({
      path: `users/${login}/comments`,
      params: {
        user: login,
        bookmarks: 'true',
        page,
      },
      version: 1,
    })
  ).data
