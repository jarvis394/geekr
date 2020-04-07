import User from './User'

export interface Comments {
  comments: Map<number, Comment>
  threads: number[]
  commentAccess: {
    isCanComment: boolean
    cantCommentReasonKey?: string
    cantCommentReason?: string
  }
  lastCommentTimestamp: number
  moderated: never
}

export interface Comment {
  id: number
  parentId: number
  level: number
  timePublished: string
  timeChanged: string
  isSuspended: boolean
  score: number
  votesCount: number
  message: string
  author: User
  isAuthor: boolean
  isFavorite: boolean
  vote: {
    value: null | number
    isCanVote: boolean
  }
  isPostAuthor: boolean
  isCanEdit: boolean
  timeEditAllowedTill: string | Date | null
  children: Comment[]
  isNew: false
}
