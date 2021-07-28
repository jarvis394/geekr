import makeRequest from './makeRequest'
import { AuthorizedRequestParams, ArticleVoteResponse } from '../interfaces'

export default async ({
  mode = 'up',
  id,
  authData,
}: {
  mode: 'up' | 'down'
  id: string | number
  authData: AuthorizedRequestParams
}) =>
  await makeRequest<ArticleVoteResponse>({
    path: `articles/${id}/votes/${mode}`,
    version: 2,
    authData,
    requestOptions: {
      method: 'POST',
    },
  })
