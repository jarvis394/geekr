import makeRequest from './makeRequest'
import { APIResponse, HubObject } from '../interfaces'

export default async (q: string): Promise<APIResponse<HubObject[]>> =>
  (
    await makeRequest({
      path: 'hubs/search',
      params: {
        q,
      },
      version: 1,
    })
  ).data
