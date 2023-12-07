import makeRequest from './makeRequest'
import { AuthorizedRequestParams, FlowAlias, Posts } from '../interfaces'

export default async ({
  page,
  flow = 'all',
  authData,
}: {
  page: number
  flow: FlowAlias
  authData?: AuthorizedRequestParams
}) => {
  let params: Record<string, string> = {
    news: 'true',
  }

  if (flow !== 'all') {
    params = {
      flowNews: 'true',
      flow,
    }
  }

  return await makeRequest<Posts>({
    path: 'articles',
    params: {
      page: page.toString(),
      ...params,
    },
    version: 2,
    authData,
  })
}
