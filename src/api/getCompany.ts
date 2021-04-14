import makeRequest from './makeRequest'
import { Company } from '../interfaces'

export default async (alias: string) =>
  await makeRequest<Company>({
    path: `companies/${alias}/card`,
    version: 2,
  })