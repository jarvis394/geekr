import makeRequest from 'src/api/makeRequest'
import { APIResponse } from 'src/interfaces'
import { UserCompanies } from 'src/interfaces/User'

export default async (login: string): Promise<APIResponse<UserCompanies>> =>
  (
    await makeRequest({
      path: `users/${login}/companies/fan`,
      version: 1,
    })
  ).data
