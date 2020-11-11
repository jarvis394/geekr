import makeTokenRequest from 'src/api/makeTokenRequest'
import { APIResponse } from 'src/interfaces'
import { UserExtended } from 'src/interfaces/User'

export default async (token: string): Promise<APIResponse<UserExtended>> =>
  (
    await makeTokenRequest({
      token,
      path: 'users/me',
    })
  ).data
