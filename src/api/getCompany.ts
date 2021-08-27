import makeRequest from './makeRequest'
import { AuthorizedRequestParams, Company } from '../interfaces'

export default async (alias: string, authData?: AuthorizedRequestParams) =>
  await makeRequest<Company>({
    path: `companies/${alias}/card`,
    version: 2,
    authData,
  })
