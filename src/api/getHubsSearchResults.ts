import makeRequest from './makeRequest'
import { APIResponse, Hubs } from '../interfaces'

export default async (q: string): Promise<APIResponse<Omit<Hubs, 'pages'>>> =>
  (
    await makeRequest({
      path: 'hubs/search',
      params: {
        q,
      },
      version: 1,
    })
  ).data
