import makeRequest from './makeRequest'
import { HubCompanies } from '../interfaces'

export default async (alias: string, page: number) =>
  await makeRequest<HubCompanies>({
    path: 'hubs/' + alias + '/companies',
    params: {
      page: page.toString(),
      perPage: '20',
      sector: '',
      order: 'rating',
      orderDirection: 'desc',
      hubAlias: alias
    },
    version: 2,
  })