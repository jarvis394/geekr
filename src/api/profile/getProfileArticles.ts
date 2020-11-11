import makeRequest from 'src/api/makeRequest'
import { Posts } from 'src/interfaces'

export default async (login: string, page: number): Promise<Posts> =>
  (
    await makeRequest({
      path: 'articles',
      params: {
        user: login,
        page,
      },
      version: 2,
    })
  ).data
