import makeRequest from 'src/api/makeRequest'
import { APIResponse, Comments } from 'src/interfaces'

export default async (login: string, page: number) =>
  await makeRequest<APIResponse<Comments>>({
    path: `users/${login}/comments`,
    params: {
      comments: 'true',
      user: login,
      page: page.toString(),
    },
    version: 1,
  })
