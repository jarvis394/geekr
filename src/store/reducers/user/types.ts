import { Company, HubObject } from 'src/interfaces'
import { UserExtended } from 'src/interfaces/User'

export const USER_PROFILE = 'USER_PROFILE_'
export const USER_PROFILE_DATA = USER_PROFILE + 'DATA_'
export const USER_PROFILE_COMPANIES = USER_PROFILE + 'COMPANIES_'
export const USER_PROFILE_CHILDREN = USER_PROFILE + 'CHILDREN_'
export const USER_PROFILE_HUBS = USER_PROFILE + 'HUBS_'

export const USER_ARTICLES = 'USER_ARTICLES_'

export interface PromiseItem<T> {
  data: Record<string, T>
  fetching: boolean
  fetched: boolean
  error: null | string
}
export interface State {
  hubs: PromiseItem<HubObject[]>
  user: PromiseItem<UserExtended>
  companies: PromiseItem<Company[]>
  children: PromiseItem<UserExtended[]>
}

export const fieldsMap = [
  'user',
  'companies',
  'children',
  'hubs'
]
export const typesMap = [
  USER_PROFILE_DATA,
  USER_PROFILE_COMPANIES,
  USER_PROFILE_CHILDREN,
  USER_PROFILE_HUBS,
]