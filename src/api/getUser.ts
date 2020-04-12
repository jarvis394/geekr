import makeRequest from './makeRequest'
import { APIResponse } from '../interfaces'
import { UserResponse } from 'src/interfaces/User'

export default async (login: string): Promise<APIResponse<UserResponse>> =>
  (
    await makeRequest({
      path: `users/${login}/profile`,
      version: 1,
    })
  ).data
