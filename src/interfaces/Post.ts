import Badge from './Badge'
import Flow from './Flow'
import Hub from './Hub'

export interface PostAuthor {
  id: string | number
  login: string
  time_registered: string | Date
  score: number
  fullname: string
  specializm: null | string
  sex: string | number
  rating: number
  contacts: Array<never>
  rating_position: string | number
  path: string
  geo: {
    country: string
    region: string
    city: string
  }
  counters: {
    posts: string | number
    comments: string | number
    followed: string | number
    followers: string | number
    favorites: string | number
  }
  badges: Badge[]
  avatar: string
  is_readonly: boolean
  is_rc: boolean
  is_subscribed: boolean
  common_tags: string[]
}

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
  author: PostAuthor
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
