import makeRequest from './makeRequest'
import { AuthorizedRequestParams, HubAuthors } from '../interfaces'

export default async ({
  alias,
  page,
  authData,
}: {
  alias: string
  page: number
  authData?: AuthorizedRequestParams
}) =>
  await makeRequest<HubAuthors>({
    path: 'hubs/' + alias + '/authors',
    params: {
      page: page.toString(),
    },
    version: 2,
    authData,
  })
