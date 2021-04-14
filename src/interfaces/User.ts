import { Badge, Hub } from '.'

export interface User {
  id: number
  alias: string
  fullname: string
  /** Support for API version 1 */
  avatar: string
  avatarUrl: string
  speciality: string
}

export interface UserCompany {
  alias: string
  commonHubs: Hub[]
  descriptionHtml: string
  id: string
  imageUrl: string
  relatedData: Record<string, never>
  statistics: {
    subscribersCount: number
    rating: number
    invest: number
  }
  titleHtml: string
}

export interface UserContact {
  title: string
  url: string
  value: string
}

export interface UserWhois {
  aboutHtml: string
  alias: string
  badgets: Badge[]
  contacts: UserContact[]
  invitedBy: {
    issuerLogin: string
    timeCreated: string
  }
}

export interface UserTag {
  name: string
  count: number
}

export interface UserCompanies {
  pagesCount: number
  companyIds: string[]
  companyRefs: UserCompany[]
}

export interface UserHubs {
  pagesCount: number
  hubIds: string[]
  hubRefs: Hub[]
}

export interface UserChildren {
  userRefs: User[]
  /** Contains users' aliases for some reason (14.04.2021) */
  userIds: string[]
  pagesCount: number
}

export interface UserLocation {
  id: string
  title: string
}

export interface UserExtended {
  alias: string
  avatarUrl: string
  birthday: string
  counterStats: {
    postCount: number
    commentCount: number
    favoriteCount: number
  }
  followStats: {
    followCount: number
    followersCount: number
  }
  fullname: string
  gender: string
  isReadonly: boolean
  lastActivityDateTime: string
  location: {
    city: UserLocation
    country: UserLocation
    region: UserLocation
  }
  rating: number
  ratingPos: number
  registerDateTime: string
  relatedData: Record<string, never>
  scoreStats: {
    score: number
    votesCount: number
  }
  score: number
  votesCount: number
  speciality: string
  workplace: { alias: string; title: string }[]
}
