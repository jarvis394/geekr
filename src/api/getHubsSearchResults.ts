import makeRequest from './makeRequest'
import { Hub } from '../interfaces'

export default async (q: string): Promise<Hub.HubsSearchResponse> =>
  (
    await makeRequest({
      path: 'hubs/search',
      params: {
        q,
      },
      version: 2,
    })
  ).data
