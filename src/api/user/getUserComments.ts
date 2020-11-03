import makeRequest from 'src/api/makeRequest'
import { APIResponse, Comments } from 'src/interfaces'

export default async (
  login: string,
  page: number
): Promise<APIResponse<Comments.Comments>> =>
  (
    await makeRequest({
      path: `users/${login}/comments`,
      params: {
        comments: 'true',
        user: login,
        page,
      },
      version: 1,
    })
  ).data
