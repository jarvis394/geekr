import makeRequest from './makeRequest'
import { APIResponse, Post } from '../interfaces'

export default async (
  id: number | string
): Promise<APIResponse<Post.PostResponse>> =>
  (
    await makeRequest({
      path: `articles/${id}`,
      version: 1,
    })
  ).data
