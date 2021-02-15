import { Comments, Company, FetchingState, Post } from 'src/interfaces'

export const PREFIX = 'POST_'
export const POST_FETCH = PREFIX + 'FETCH'
export const POST_FETCH_FULFILLED = POST_FETCH + '_FULFILLED'
export const POST_FETCH_REJECTED = POST_FETCH + '_REJECTED'
export const COMMENTS_FETCH = PREFIX + 'COMMENTS_FETCH'
export const COMMENTS_FETCH_FULFILLED = COMMENTS_FETCH + '_FULFILLED'
export const COMMENTS_FETCH_REJECTED = COMMENTS_FETCH + '_REJECTED'
export const COMPANY_FETCH = PREFIX + 'COMPANY_FETCH'
export const COMPANY_FETCH_FULFILLED = COMPANY_FETCH + '_FULFILLED'
export const COMPANY_FETCH_REJECTED = COMPANY_FETCH + '_REJECTED'
export const SET_POST_READING_PROGRESS = 'SET_POST_READING_PROGRESS'

export interface PostReadingProgressProps {
  post: Post
  offset: number
  progress: number
}

export interface State {
  comments: {
    data: Comments
    state: FetchingState
    fetchError: string
  }
  post: {
    data: Post
    state: FetchingState
    fetchError: string
  }
  company: {
    data: Company
    state: FetchingState
    fetchError: string
  }
  lastPost: {
    data: Post
    progress: number
    offset: number
  }
}
