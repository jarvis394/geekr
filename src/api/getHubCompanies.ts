import makeRequest from './makeRequest'
import { AuthorizedRequestParams, HubCompanies } from '../interfaces'

export default async ({
  alias,
  page,
  authData,
}: {
  alias: string
  page: number
  authData?: AuthorizedRequestParams
}) =>
  await makeRequest<HubCompanies>({
    path: 'hubs/' + alias + '/companies',
    params: {
      page: page.toString(),
      perPage: '20',
      sector: '',
      order: 'rating',
      orderDirection: 'desc',
      hubAlias: alias,
    },
    version: 2,
    authData,
  })
