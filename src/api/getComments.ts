import makeRequest from './makeRequest'
import { Comments } from '../interfaces'

export default async (id: number): Promise<Comments.Comments> =>
  (
    await makeRequest({
      path: `articles/${id}/comments`,
      version: 2,
    })
  ).data
