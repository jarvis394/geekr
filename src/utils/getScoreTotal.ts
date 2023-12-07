import { Post } from 'src/interfaces'

const getScoreTotal = ({
  post,
  voteState,
}: {
  post: Post
  voteState: {
    canVote: boolean
    vote: {
      value: number | null
      voteTimeExpired: string | null
    }
    voteByDefault: boolean
  }
}) => {
  const total =
    post.statistics.votesCount +
    (voteState?.vote?.value && !voteState.voteByDefault ? 1 : 0)
  const score = Number(
    post.statistics.score +
      (!voteState.voteByDefault ? voteState?.vote?.value || 0 : 0)
  )
  const positive = (total + score) / 2
  const negative = (total - score) / 2
  return { total, score, positive, negative }
}

export default getScoreTotal
