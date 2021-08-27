import { API_TOKEN_URL } from 'src/config/constants'
import { Post } from 'src/interfaces'

export default (post: Post) => {
  if (!post) return ''

  const { titleHtml } = post
  return encodeURI(
    API_TOKEN_URL + 'social?t=' + titleHtml + '&s=' + post.hubs[0].title
  )
}
