import makeRequest from './makeRequest'
import { AuthorizedRequestParams, Posts } from '../interfaces'

export default async (id: number, authData?: AuthorizedRequestParams) =>
  await makeRequest<Posts>({
    path: `articles/${id}/similar`,
    version: 2,
    authData
  })
