import Post from './Post'

export default interface Posts {
  pagesCount: number
  publicationRefs: Record<number, Post>
  publicationIds: number[]
}

export interface PostsDeprecated {
  pagesCount: number
  articleRefs: Record<number, Post>
  articleIds: number[]
}
