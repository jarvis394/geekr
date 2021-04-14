import makeRequest from 'src/api/makeRequest'
import { UserHubs } from 'src/interfaces/User'

export default async (login: string) =>
  await makeRequest<UserHubs>({
    path: `users/${login}/subscriptions/hubs`,
    version: 2,
  })
