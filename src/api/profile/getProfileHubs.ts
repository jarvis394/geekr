import makeRequest from 'src/api/makeRequest'
import { APIResponse } from 'src/interfaces'
import { UserHubs } from 'src/interfaces/User'

export default async (login: string) =>
  await makeRequest<APIResponse<UserHubs>>({
    path: `users/${login}/hubs`,
    version: 2,
  })
