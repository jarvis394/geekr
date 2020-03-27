import Post from './Post'

export default interface Posts {
  pagesCount: number
  articleRefs: Map<number, Post>
  articleIds: number[]
}