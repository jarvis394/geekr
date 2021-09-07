import makeRequest from './makeRequest'
import { AuthorizedRequestParams, Post } from '../interfaces'
import APIError from 'src/interfaces/APIError'

export default async (
  id: number | string,
  authData?: AuthorizedRequestParams
) =>
  await makeRequest<Post | APIError>({
    path: `articles/${id}`,
    version: 2,
    authData,
  })
