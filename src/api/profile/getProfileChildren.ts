import makeRequest from 'src/api/makeRequest'
import { UserChildren } from 'src/interfaces/User'

export default async (login: string) =>
  await makeRequest<UserChildren>({
    path: `users/${login}/invited`,
    version: 2,
  })
