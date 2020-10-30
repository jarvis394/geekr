import makeRequest from './makeRequest'
import { APIResponse, Company } from '../interfaces'

export default async (alias: string): Promise<APIResponse<Company>> =>
  (
    await makeRequest({
      path: `companies/${alias}/profile`,
      version: 1,
    })
  ).data
