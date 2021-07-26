import makeRequest from './makeRequest'
import { AuthorizedRequestParams, HubsResponse } from '../interfaces'

export default async (page: number, authData?: AuthorizedRequestParams) =>
  await makeRequest<HubsResponse>({
    path: 'hubs',
    params: {
      page: page.toString(),
    },
    version: 2,
    authData,
  })
