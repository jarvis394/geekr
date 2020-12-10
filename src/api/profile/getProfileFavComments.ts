import makeRequest from 'src/api/makeRequest'
import { APIResponse, Comments } from 'src/interfaces'

export default async (login: string, page: number) =>
  await makeRequest<APIResponse<Comments>>({
    path: `users/${login}/comments`,
    params: {
      user: login,
      bookmarks: 'true',
      page: page.toString(),
    },
    version: 1,
  })
