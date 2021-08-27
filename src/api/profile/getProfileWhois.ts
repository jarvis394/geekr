import makeRequest from 'src/api/makeRequest'
import { APIResponse } from 'src/interfaces'
import { UserWhois } from 'src/interfaces/User'

export default async (alias: string) =>
  await makeRequest<UserWhois>({
    path: `users/${alias}/whois`,
    version: 2,
  })
