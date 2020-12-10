import makeRequest from './makeRequest'
import { Post } from '../interfaces'

export default async (id: number | string) =>
  await makeRequest<Post>({
    path: `articles/${id}`,
    version: 2,
  })
