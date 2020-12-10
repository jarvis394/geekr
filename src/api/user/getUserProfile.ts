import makeRequest from 'src/api/makeRequest'
import { APIResponse } from 'src/interfaces'
import { UserExtended } from 'src/interfaces/User'

export default async (token: string) =>
  await makeRequest<APIResponse<UserExtended>>({
    token,
    path: 'users/me',
  })
