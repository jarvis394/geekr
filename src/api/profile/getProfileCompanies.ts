import makeRequest from 'src/api/makeRequest'
import { UserCompanies } from 'src/interfaces/User'

export default async (alias: string) =>
  await makeRequest<UserCompanies>({
    path: `users/${alias}/subscriptions/companies`,
    version: 2,
  })