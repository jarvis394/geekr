import makeRequest from './makeRequest'
import { DownvoteReasons } from '../interfaces'

export default async () =>
  await makeRequest<DownvoteReasons>({
    path: 'votes/reasons',
    version: 2,
  })
