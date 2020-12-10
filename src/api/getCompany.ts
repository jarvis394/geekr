import makeRequest from './makeRequest'
import { APIResponse, Company } from '../interfaces'

export default async (alias: string) =>
  await makeRequest<APIResponse<Company>>({
    path: `companies/${alias}/profile`,
    version: 1,
  })
