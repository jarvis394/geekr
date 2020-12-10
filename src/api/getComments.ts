import makeRequest from './makeRequest'
import { Comments } from '../interfaces'

export default async (id: number) =>
  await makeRequest<Comments>({
    path: `articles/${id}/comments`,
    version: 2,
  })
