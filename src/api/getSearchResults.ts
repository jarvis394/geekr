import makeRequest from './makeRequest'
import { AuthorizedRequestParams, Posts } from '../interfaces'

// TODO: Needs an interface for the returning data
export default async ({
  query,
  page,
  order,
  authData,
}: {
  query: string
  page: number
  order: 'relevance' | 'date' | 'rating'
  authData?: AuthorizedRequestParams
}) =>
  await makeRequest<Posts>({
    path: 'articles',
    version: 2,
    params: {
      query,
      page: page.toString(),
      order,
    },
    authData,
  })
