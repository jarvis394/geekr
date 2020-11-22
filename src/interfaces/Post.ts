import Flow from './Flow'
import { HubPost } from './Hub'
import { User } from './User'

export default interface Post {
  id: string | number
  author: User
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
  postLabels: string[]
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
  votesEnabled: boolean
}
