import makeRequest from './makeRequest'
import { AuthorizedRequestParams, Posts } from '../interfaces'

export default async (authData?: AuthorizedRequestParams) =>
  await makeRequest<{ articles: Posts }>({
    path: 'articles/most-reading',
    version: 2,
    authData,
  })
