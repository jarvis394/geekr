import makeRequest from './makeRequest'
import { Posts } from '../interfaces'

export default async (page: number) =>
  await makeRequest<Posts>({
    path: 'articles',
    params: {
      news: 'true',
      page: page.toString(),
    },
    version: 2,
  })
