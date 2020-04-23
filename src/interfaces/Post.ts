import Flow from './Flow'
import Hub from './Hub'
import { UserExtended } from './User'

export default interface Post {
  id: string | number
  is_corporative: string | number | boolean
  is_tutorial: boolean
  time_published: string
  time_interesting: string
  comments_count: string | number
  score: string | number
  votes_count: string | number
  favorites_count: string | number
  lang: 'ru' | 'en'
  tags_string: string
  title: string
  preview_html: string
  text_html: string
  text_cut: string
  is_comments_hide: string | number | boolean
  editor_version: string | number
  is_recovery_mode: boolean
  metadata: {
    meta_image: string
    description: string
    ga_page_type: string
  }
  flows: Flow[]
  hubs: Hub[]
  reading_count: number
  path: string
  full_url: string
  author: UserExtended
  has_polls: boolean
  url: string
  post_type: string | number
  post_type_str: string
  vote: null | number
  is_can_vote: boolean
  voting: {
    score: number
    voteCount: {
      total: number
      positive: number
      negative: number
    }
    vote: null | number
    reasonMap: never
  }
  is_habred: true
  is_interesting: true
  is_favorite: false
  comments_new: null | number
  images: string[]
}
