import makeRequest from 'src/api/makeRequest'
import { APIResponse } from 'src/interfaces'
import { UserChildren } from 'src/interfaces/User'

export default async (login: string): Promise<APIResponse<UserChildren>> =>
  (
    await makeRequest({
      path: `users/${login}/children`,
      version: 1,
    })
  ).data
