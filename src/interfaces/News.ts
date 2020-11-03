export interface NewsItem {
  id: number | string
  timePublished: string | Date
  commentsCount: string | number
  lang: 'ru' | 'en'
  title: string
  isCommentsHide: string | number
  path: string
  fullUrl: string
  commentsNew: number | null
}
