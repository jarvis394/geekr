import makeRequest from './makeRequest'
import { AuthorizedRequestParams, Comments } from '../interfaces'

export default async (id: string | number, authData?: AuthorizedRequestParams) =>
  await makeRequest<Comments>({
    path: `articles/${id}/comments`,
    version: 2,
    authData,
  })
