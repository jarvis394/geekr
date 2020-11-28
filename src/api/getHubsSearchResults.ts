import makeRequest from './makeRequest'
import { HubsSearchResponse } from '../interfaces'

export default async (q: string): Promise<HubsSearchResponse> =>
  (
    await makeRequest({
      path: 'hubs/search',
      params: {
        q,
      },
      version: 2,
    })
  ).data
