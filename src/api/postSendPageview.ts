import makeRequest from './makeRequest'
import { AuthorizedRequestParams, Post } from '../interfaces'

export default async (
  id: number | string,
  authData: AuthorizedRequestParams
) =>
  await makeRequest<Post>({
    path: `articles/${id}/pageview`,
    version: 1,
    authData,
    requestOptions: {
      method: 'POST',
      data: {},
      headers: {
        Referer: `https://habr.com/ru/post/${id}`
      }
    },
  })