import Flow from './Flow'
import { HubPost } from './Hub'
import PostLabel from './PostLabel'
import { UserExtended } from './User'

export interface SchemaJsonLd {
  '@context': string
  '@type': string
  mainEntityOfPage: {
    '@type': string
    '@id': string
  }
  headline: string
  datePublished: string
  dateModified: string
  author: { '@type': string; name: string }
  publisher: {
    '@type': string
    name: string
    logo: {
      '@type': string
      url: string
    }
  }
  description: string
  url: string
  about: string[]
  image: string[]
}

export default interface Post {
  id: string | number
  author: UserExtended
  commentsEnabled: boolean
  editorVersion: string
  flows: Flow[]
  hubs: HubPost[]
  isCorporative: boolean
  isEditorial: boolean
  lang: 'ru' | 'en'
  leadData: {
    buttonTextHtml: string
    imageUrl: string | null
    textHtml: string
  }
  metadata: {
    metaDescription: string
    schemaJsonLd: string
    scriptUrls: string[]
    shareImageHeight: number
    shareImageWidth: number
    shareImageUrl: string
    stylesUrls: string[]
    vkShareImageUrl: string
  }
  polls: never[]
  postLabels: PostLabel[]
  postType: string
  statistics: {
    commentsCount: number
    favoritesCount: number
    readingCount: number
    score: number
    votesCount: number
  }
  tags: { titleHtml: string }[]
  textHtml: string
  timePublished: string
  titleHtml: string
  translationData: {
    originalAuthorName: string
    originalUrl: string
  }
  relatedData?: {
    bookmarked: boolean
    canComment: boolean
    canEdit: boolean
    canViewVotes: boolean
    canVote: boolean
    unreadCommentsCount: number
    vote: {
      value: number | null
      voteTimeExpired: string
    }
  }

  /** Contains an URL of the first image in text preview */
  postFirstImage?: string
  votesEnabled: boolean
}
