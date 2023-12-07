import makeRequest from './makeRequest'
import { AuthorizedRequestParams } from '../interfaces'
import { PostsDeprecated } from 'src/interfaces/Posts'

export default async (id: number, authData?: AuthorizedRequestParams) =>
  await makeRequest<PostsDeprecated>({
    path: `articles/${id}/similar`,
    version: 2,
    authData,
  })
