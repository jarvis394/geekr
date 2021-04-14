import { User, UserLocation } from './User'

export default interface Company {
  aDeskSettings: unknown
  alias: string
  careerAlias: string
  contacts: {
    title: string
    url: string
  }[]
  descriptionHtml: string
  foundationDate: {
    year: string
    month: string
    day: string
  }
  imageUrl: string
  location: {
    city: UserLocation
    location: UserLocation
    region: UserLocation
  }
  metadata: {
    description: string
    descriptionHtml: string
    keywords: string[]
    title: string
    titleHtml: string
  }
  registrationDate: string
  relatedData: Record<string, never>
  representativeUser: User
  settings: {
    analyticsSettings: {
      type: string
      trackingId: string
    }[]
    branding: {
      imageUrl: string
      linkUrl: string
      pixelUrl: string
    }
    status: string
  }
  siteUrl: string
  staffNumber: string
  statistics: {
    careerRating: number
    employeesCount: number
    invest: number
    newsCount: number
    postsCount: number
    rating: number
    subscribersCount: number
    vacanciesCount: number
  }
  titleHtml: string
}

export interface CompanyPost {
  alias: string
  analytics: {
    id: string
    service: string
    type: number
  }[]
  branding: {
    headerImageUrl: string
    headerUrl: string
    statisticCounterUrl: string
  }
  categories: {
    id: string
    title: string
    alias: string
  }[]
  contacts: {
    title: string
    link: string
  }[]
  date_foundation: string
  description: string
  directors: {
    name: string
    position: string
  }
  fans_count: number
  geo: {
    country: string
    region: string
    city: string
  }
  human_resourse: number
  human_resourse_str: string
  icon: string
  id: number
  is_fan: boolean
  is_show_banners: boolean
  is_show_news: boolean
  name: string
  path: string
  rating: number
  rating_position: number
  score: number
  specializm: string
  stages: unknown[]
  time_registration: string
  url: string
  vacancies_count: number
}