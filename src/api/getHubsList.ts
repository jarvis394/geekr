import makeRequest from './makeRequest'
import { HubsResponse } from '../interfaces'

export default async (page: number) =>
  await makeRequest<HubsResponse>({
    path: 'hubs',
    params: {
      page: page.toString(),
    },
    version: 2,
  })
