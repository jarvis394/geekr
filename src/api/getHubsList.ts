import makeRequest from './makeRequest'
import { APIResponse, Hubs } from '../interfaces'

export default async (page: number): Promise<APIResponse<Hubs>> =>
  (
    await makeRequest({
      path: 'hubs',
      params: {
        page,
      },
      version: 1,
    })
  ).data
