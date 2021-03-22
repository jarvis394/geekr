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
  id: number
  statistics: {
    rating: number
    subscribersCount: number
  }
  titleHtml: string
  relatedData: unknown
  imageUrl: string
  descriptionHtml: string
  alias: string
  commonTags: string[]
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
  login: string
  rating: number
  scoreStats: {
    score: number
    votesCount: number
  }
  speciality: string
}

export interface HubCompany {
  alias: string
  commonHubs: {
    alias: string
    id: string
    title: string
    titleHtml: string
    type: string
  }[]
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
