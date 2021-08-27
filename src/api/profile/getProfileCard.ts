import makeRequest from 'src/api/makeRequest'
import { UserExtended } from 'src/interfaces/User'

export default async (alias: string) =>
  await makeRequest<UserExtended>({
    path: `users/${alias}/card`,
    version: 2,
  })
