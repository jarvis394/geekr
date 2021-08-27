import makeRequest from './makeRequest'
import { AuthorizedRequestParams, UserCompanies } from '../interfaces'

export default async ({
  page = 1,
  perPage = 10,
  sort = 'rating',
  orderDirection = 'desc',
  sector = '',
  authData
}: Partial<{
  page: number
  perPage: number
  sort: 'rating' | 'title'
  orderDirection: 'asc' | 'desc'
  authData?: AuthorizedRequestParams
  sector:
    | ''
    | 'webdev'
    | 'software'
    | 'hardware'
    | 'design'
    | 'advertisment'
    | 'massmedia'
    | 'consulting'
    | 'hr'
    | 'ecommerce'
    | 'noncommerce'
    | 'optimization'
    | 'multimedia'
    | 'telecom'
    | 'hosting'
    | 'se'
    | 'mobile'
    | 'webservices'
    | 'entertainment'
    | 'security'
}>) =>
  await makeRequest<UserCompanies>({
    path: 'companies',
    params: {
      page: page.toString(),
      perPage: perPage.toString(),
      sort,
      sector,
      order: sort === 'title' ? 'abc' : 'rating',
      orderDirection,
    },
    version: 2,
    authData
  })
