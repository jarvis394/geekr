export interface AdvertsResponse {
  success: boolean
  adverts: Advert[]
}

export interface Advert {
  imageUrl: string
  label: string
  title: string
  linkUrl: string
  external: boolean
}
