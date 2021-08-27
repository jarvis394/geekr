import { Post } from '.'

export interface HubsResponse {
  hubIds: string[]
  hubRefs: Record<string, Hub>
  pagesCount: number
}

export interface HubsSearchResponse {
  hubIds: string[]
  hubRefs: Record<string, Hub>
  pagesCount: number
  searchStatistics: {
    articlesCount: number
    commentsCount: number
    hubsCount: number
    usersCount: number
    companiesCount: number
  }
}

export interface Hub {
  alias: string
  commonTags: string[]
  descriptionHtml: string
  id: string
  imageUrl: string
  isOfftop: boolean
  isProfiled: boolean
  relatedData: Record<string, never>
  statistics: {
    subscribersCount: number
    rating: number
    authorsCount: number
    postsCount: number
  }
  titleHtml: string
}

export interface HubPost {
  title: string
  alias: string
  id: string
  type: string
}

export interface HubAuthor {
  alias: string
  avatarUrl: string
  fullname: string
  id: string
  invest: number
  lastPost: Post
  rating: number
  scoreStats: {
    score: number
    votesCount: number
  }
  speciality: string
}

export interface HubShort {
  alias: string
  id: string
  title: string
  titleHtml: string
  type: string
}

export interface HubCompany {
  alias: string
  commonHubs: HubShort[]
  descriptionHtml: string
  id: string
  imageUrl: string
  titleHtml: Post
  statistics: {
    invest: number
    rating: number
    subscribersCount: number
  }
}

export interface HubAuthors {
  authorIds: string[]
  authorRefs: Record<string, HubAuthor>
  pagesCount: number
}

export interface HubCompanies {
  companyIds: string[]
  companyRefs: Record<string, HubCompany>
  pagesCount: number
}

export interface HubExtended {
  alias: string
  descriptionHtml: string
  fullDescriptionHtml: string
  imageUrl: string
  keywords: string[]
  relatedData: {
    isSubscribed: boolean
  }
  sponsorship: {
    curator: {
      alias: string
      avatarUrl: string
      fullname: string
      id: number
      speciality: string
    }
    imageUrl: string
    linkUrl: string
  }
  statistics: {
    subscribersCount: number
    rating: number
    authorsCount: number
    postsCount: number
  }
  authorsCount: number
  postsCount: number
  rating: number
  subscribersCount: number
  titleHtml: string
}
