interface ArticleVoteResponse {
  canVote: boolean
  chargeSettings: {
    postVoteCount: number
    commentVoteCount: number
  }
  score: number
  vote: {
    value: 1 | -1 | null
    voteTimeExpired: string
  }
  votesCount: number
}

export default ArticleVoteResponse
