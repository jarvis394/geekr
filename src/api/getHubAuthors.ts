import makeRequest from './makeRequest'
import { HubAuthors } from '../interfaces'

export default async (alias: string, page: number) =>
  await makeRequest<HubAuthors>({
    path: 'hubs/' + alias + '/authors',
    params: {
      page: page.toString()
    },
    version: 2,
  })