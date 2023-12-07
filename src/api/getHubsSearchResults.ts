import makeRequest from './makeRequest'
import { AuthorizedRequestParams, HubsSearchResponse } from '../interfaces'

export default async (q: string, authData?: AuthorizedRequestParams) =>
  await makeRequest<HubsSearchResponse>({
    path: 'hubs/search',
    params: {
      q,
    },
    version: 2,
    authData,
  })
