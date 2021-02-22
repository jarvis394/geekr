import { Post } from 'src/interfaces'

export default (post: Post) => {
  const { id, isCorporative } = post
  const companyAlias = isCorporative
    ? post.hubs.find((e) => e.type === 'corporative').alias
    : null
  return isCorporative
    ? '/company/' + companyAlias + '/blog/' + id
    : '/post/' + id
}
