/* eslint-disable @typescript-eslint/camelcase */
import makeRequest from './makeRequest'
import { Posts } from '../interfaces'

export default async (): Promise<Posts> =>
  (
    await makeRequest({
      path: 'news/context',
      version: 2,
      params: {
        extend_context: 'true',
        per_page: 5,
        page_num: 1,
      },
    })
  ).data
