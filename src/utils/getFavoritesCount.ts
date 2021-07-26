import { Post } from 'src/interfaces'
import formatNumber from './formatNumber'

const getFavoritesCount = ({
  post,
  isBookmarked,
}: {
  post: Post
  isBookmarked: boolean
}) => {
  const postBookmarked = post?.relatedData?.bookmarked
  const favoritesCount = post.statistics.favoritesCount
  let favoritesCountAddAmount = 0

  if (postBookmarked) {
    favoritesCountAddAmount = isBookmarked ? 0 : -1
  } else {
    favoritesCountAddAmount = isBookmarked ? 1 : 0
  }

  return formatNumber(favoritesCount + favoritesCountAddAmount)
}

export default getFavoritesCount