import makeRequest from './makeRequest'
import { Post } from '../interfaces'

export default async (
  id: number | string
): Promise<Post> =>
  (
    await makeRequest({
      path: `articles/${id}`,
      version: 2,
    })
  ).data
