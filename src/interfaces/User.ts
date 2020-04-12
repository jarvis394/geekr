import { Badge } from '.'

export interface User {
  id: number
  login: string
  fullname: string
  avatar: string
  avatar_url: string
  speciality: string
}

export interface UserTag {
  name: string
  count: number
}

export interface UserExtended {
  id: string | number
  birthday: string
  description_html: string
  common_tags: UserTag[]
  login: string
  time_registered: string
  score: number
  fullname: string
  specializm: string
  sex: string | number
  rating: number
  time_invited: string
  invited_by_login: string
  contacts: never[]
  rating_position: number
  display_children: boolean
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
}

export interface UserResponse {
  user: UserExtended
}