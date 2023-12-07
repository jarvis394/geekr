import makeRequest from './makeRequest'
import { AuthorizedRequestParams, Posts } from '../interfaces'

export default async ({
  hubAlias,
  authData,
}: {
  hubAlias?: string
  authData?: AuthorizedRequestParams
}) =>
  await makeRequest<Posts>({
    path: 'news/context',
    version: 2,
    params: {
      extend_context: 'true',
      per_page: '5',
      page_num: '1',
      context_hub_alias: hubAlias || '',
    },
    authData,
  })
