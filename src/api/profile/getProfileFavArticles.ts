import makeRequest from 'src/api/makeRequest'
import { APIResponse, Posts } from 'src/interfaces'

export default async (login: string, page: number) =>
  await makeRequest<APIResponse<Posts>>({
    path: 'articles',
    params: {
      user: login,
      user_bookmarks: 'true',
      page: page.toString(),
    },
    version: 1,
  })
