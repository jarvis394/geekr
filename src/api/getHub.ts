import makeRequest from './makeRequest'
import { HubExtended } from '../interfaces'

export default async (alias: string) =>
  await makeRequest<HubExtended>({
    path: 'hubs/' + alias + '/profile',
    version: 2,
  })
