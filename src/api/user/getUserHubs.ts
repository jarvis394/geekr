import makeRequest from 'src/api/makeRequest'
import { APIResponse } from 'src/interfaces'
import { UserHubs } from 'src/interfaces/User'

export default async (login: string): Promise<APIResponse<UserHubs>> =>
  (
    await makeRequest({
      path: `users/${login}/hubs`,
      version: 1,
    })
  ).data
