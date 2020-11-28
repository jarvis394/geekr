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
