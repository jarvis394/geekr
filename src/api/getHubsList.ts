import makeRequest from './makeRequest'
import { APIResponse, HubObject } from '../interfaces'

export default async (page: number): Promise<APIResponse<HubObject[]>> =>
  (
    await makeRequest({
      path: 'hubs',
      params: {
        page,
      },
      version: 1,
    })
  ).data
