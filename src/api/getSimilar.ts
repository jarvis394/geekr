import makeRequest from './makeRequest'
import { Posts } from '../interfaces'

export default async (id: number) =>
  await makeRequest<Posts>({
    path: `articles/${id}/similar`,
    version: 2,
  })
