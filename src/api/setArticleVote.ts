import makeRequest from './makeRequest'
import { AuthorizedRequestParams, ArticleVoteResponse } from '../interfaces'

export default async ({
  mode = 'up',
  id,
  authData,
  reason,
}: {
  mode: 'up' | 'down'
  id: string | number
  authData: AuthorizedRequestParams
  reason?: string
}): Promise<ArticleVoteResponse> =>
  await makeRequest<ArticleVoteResponse>({
    path: `articles/${id}/votes/${mode}`,
    version: 2,
    authData,
    requestOptions: {
      method: 'POST',
      data: reason
        ? {
            reason,
          }
        : null,
    },
  })
