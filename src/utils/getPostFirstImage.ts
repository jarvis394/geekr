import { Post } from 'src/interfaces'

export default (post: Post) => {
  if (post.leadData.imageUrl) return post.leadData.imageUrl

  const textHtml = post.leadData.textHtml
  const imageURLRegEx = /<img[^>]+src="?([^"\s]+)"?\s*/g
  const imageURLRegExResults = imageURLRegEx.exec(textHtml)

  return imageURLRegExResults ? imageURLRegExResults[1] : null
}