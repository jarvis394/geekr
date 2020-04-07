import makeRequest from './makeRequest'
import { APIResponse, SimilarPosts } from '../interfaces'

export default async (id: number): Promise<APIResponse<SimilarPosts>> =>
  (
    await makeRequest({
      path: `articles/${id}/similar`,
      version: 1,
    })
  ).data
