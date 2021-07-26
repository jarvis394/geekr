import makeRequest from './makeRequest'
import { AuthorizedRequestParams } from '../interfaces'

export default async ({
  mode = 'add',
  id,
  authData,
}: {
  mode: 'add' | 'remove'
  id: string | number
  authData: AuthorizedRequestParams
}) =>
  await makeRequest<{
    ok: boolean
    server_time: string
  }>({
    path: `articles/${id}/bookmarks/${mode}`,
    version: 1,
    authData,
    requestOptions: {
      method: 'POST',
    },
  })
