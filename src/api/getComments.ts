import makeRequest from './makeRequest'
import { APIResponse, Comments } from '../interfaces'

export default async (id: number): Promise<APIResponse<Comments.Comments>> => (await makeRequest({
  path: `articles/${id}/comments`,
  version: 2
})).data
