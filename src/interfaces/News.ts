export interface NewsItem {
  id: number | string
  time_published: string | Date
  comments_count: string | number
  lang: 'ru' | 'en'
  title: string
  is_comments_hide: string | number
  path: string
  full_url: string
  comments_new: number | null
}

export default interface News {
  items: NewsItem[]
}
