import makeRequest from './makeRequest'
import { HubsSearchResponse } from '../interfaces'

export default async (q: string) =>
  await makeRequest<HubsSearchResponse>({
    path: 'hubs/search',
    params: {
      q,
    },
    version: 2,
  })
