import makeRequest from './makeRequest'
import { HubsResponse } from '../interfaces'

export default async (page: number): Promise<HubsResponse> =>
  (
    await makeRequest({
      path: 'hubs',
      params: {
        page,
      },
      version: 2,
    })
  ).data
