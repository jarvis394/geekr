import makeRequest from './makeRequest'
import { APIResponse, Post } from '../interfaces'

export default async (id: number) =>
  await makeRequest<APIResponse<Post[]>>({
    path: `articles/${id}/similar`,
    version: 2,
  })
