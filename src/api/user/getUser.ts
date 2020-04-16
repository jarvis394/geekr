import makeRequest from 'src/api/makeRequest'
import { APIResponse } from 'src/interfaces'
import { UserResponse } from 'src/interfaces/User'

export default async (login: string): Promise<APIResponse<UserResponse>> =>
  (
    await makeRequest({
      path: `users/${login}/profile`,
      version: 1,
    })
  ).data
