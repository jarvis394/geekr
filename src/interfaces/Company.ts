export interface CompanyContact {
  link: string
  small_link: string
  title: string
  value: string
}

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
  categories: {id: string, title: string, alias: string}[]
  contacts: CompanyContact[]
  date_foundation: string
  geo: {country: string, region: string, city: string}
  human_resourse: number
  human_resourse_str: string
  is_show_banners: boolean
  is_show_news: boolean
  score: 0
  stages: []
  time_registration: "2016-03-18T08:43:01+03:00"
  vacancies_count: 0
}
