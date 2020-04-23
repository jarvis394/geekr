import makeRequest from './makeRequest'
import { APIResponse, Post } from '../interfaces'

export default async (id: number): Promise<APIResponse<Post[]>> =>
  (
    await makeRequest({
      path: `articles/${id}/similar`,
      version: 1,
    })
  ).data
