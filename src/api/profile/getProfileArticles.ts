import makeRequest from 'src/api/makeRequest'
import { Posts } from 'src/interfaces'

export default async (login: string, page: number) =>
  await makeRequest<Posts>({
    path: 'articles',
    params: {
      user: login,
      page: page.toString(),
    },
    version: 2,
  })
