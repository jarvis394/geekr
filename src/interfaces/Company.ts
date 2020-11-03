export default interface Company {
  id: number
  alias: string
  name: string
  specializm: string
  description: string
  url: string
  fans_count: number
  rating: number
  rating_position: number
  icon: string
  path: string
  is_fan: boolean
  branding: {
    headerImageUrl: string
    headerUrl: string
    statisticCounterUrl: unknown
  }
  categories: {
    id: string
    title: string
    alias: string
  }[]
  contacts: {
    link: string
    small_link: string
    title: string
    value: string
  }[]
  date_foundation: string
  geo: { country: string; region: string; city: string }
  human_resourse: number
  human_resourse_str: string
  is_show_banners: boolean
  is_show_news: boolean
  score: number
  stages: unknown
  time_registration: string
  vacancies_count: number
}
