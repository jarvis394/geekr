import makeRequest from './makeRequest'
import { Comments } from '../interfaces'

export default async (id: string | number) =>
  await makeRequest<Comments>({
    path: `articles/${id}/comments`,
    version: 2,
  })
