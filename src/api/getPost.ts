import makeRequest from './makeRequest'
import { AuthorizedRequestParams, Post } from '../interfaces'

export default async (
  id: number | string,
  authData?: AuthorizedRequestParams
) =>
  await makeRequest<Post>({
    path: `articles/${id}`,
    version: 2,
    authData,
  })
