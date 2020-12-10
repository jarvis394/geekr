import makeRequest from 'src/api/makeRequest'
import { APIResponse } from 'src/interfaces'
import { UserChildren } from 'src/interfaces/User'

export default async (login: string) =>
  await makeRequest<APIResponse<UserChildren>>({
    path: `users/${login}/children`,
    version: 1,
  })
