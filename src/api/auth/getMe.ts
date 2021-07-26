import makeRequest from 'src/api/makeRequest'
import { Me, AuthorizedRequestParams } from 'src/interfaces'

export default async (authData: AuthorizedRequestParams) =>
  await makeRequest<Me>({
    path: 'me',
    version: 2,
    authData,
  })
