import { Comment, Comments, Company, FetchingState, Post } from 'src/interfaces'
import { DownvoteReason } from 'src/interfaces/DownvoteReasons'

export const PREFIX = 'POST_'
export const POST_FETCH = PREFIX + 'FETCH'
export const POST_FETCH_FULFILLED = POST_FETCH + '_FULFILLED'
export const POST_FETCH_REJECTED = POST_FETCH + '_REJECTED'
export const COMMENTS_FETCH = PREFIX + 'COMMENTS_FETCH'
export const COMMENTS_FETCH_FULFILLED = COMMENTS_FETCH + '_FULFILLED'
export const COMMENTS_FETCH_REJECTED = COMMENTS_FETCH + '_REJECTED'
export const SET_POST_COMMENT_SIZE = 'SET_POST_COMMENT_SIZE'
export const COMPANY_FETCH = PREFIX + 'COMPANY_FETCH'
export const COMPANY_FETCH_FULFILLED = COMPANY_FETCH + '_FULFILLED'
export const COMPANY_FETCH_REJECTED = COMPANY_FETCH + '_REJECTED'
export const POST_DOWNVOTE_REASONS_FETCH =
  PREFIX + 'POST_DOWNVOTE_REASONS_FETCH'
export const POST_DOWNVOTE_REASONS_FETCH_FULFILLED =
  POST_DOWNVOTE_REASONS_FETCH + '_FULFILLED'
export const POST_DOWNVOTE_REASONS_FETCH_REJECTED =
  POST_DOWNVOTE_REASONS_FETCH + '_REJECTED'
export interface GetPostCommentsOptions {
  sortByKarma: boolean
}
export interface State {
  comments: {
    fetchedData: Comments | null
    comments: Comment[] | null
    state: FetchingState
    fetchError: string | null
    sizesMap: Record<string, number>
    parseOptions: Partial<GetPostCommentsOptions>
  }
  post: {
    data: Post | null
    state: FetchingState
    fetchError: string | null
  }
  company: {
    data: Company | null
    state: FetchingState
    fetchError: string | null
  }
  downvoteReasons: {
    data: DownvoteReason[] | null
    state: FetchingState
    fetchError: string | null
  }
}
