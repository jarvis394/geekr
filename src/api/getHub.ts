import makeRequest from './makeRequest'
import { AuthorizedRequestParams, HubExtended } from '../interfaces'

export default async (alias: string, authData?: AuthorizedRequestParams) =>
  await makeRequest<HubExtended>({
    path: 'hubs/' + alias + '/profile',
    version: 2,
    authData,
  })
