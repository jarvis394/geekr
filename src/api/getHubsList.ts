import makeRequest from './makeRequest'
import { Hub } from '../interfaces'

export default async (page: number): Promise<Hub.HubsResponse> =>
  (
    await makeRequest({
      path: 'hubs',
      params: {
        page,
      },
      version: 2,
    })
  ).data
