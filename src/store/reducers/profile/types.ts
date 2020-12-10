import { Company, Hub } from 'src/interfaces'
import { UserExtended } from 'src/interfaces/User'

export const PROFILE = 'PROFILE_'
export const PROFILE_DATA = PROFILE + 'DATA_'
export const PROFILE_COMPANIES = PROFILE + 'COMPANIES_'
export const PROFILE_CHILDREN = PROFILE + 'CHILDREN_'
export const PROFILE_HUBS = PROFILE + 'HUBS_'

export const PROFILE_ARTICLES = 'PROFILE_ARTICLES_'

export interface PromiseItem<T> {
  data: T
  fetching: boolean
  fetched: boolean
  error: null | string
}
export interface State {
  hubs?: PromiseItem<{
    hubIds: string[]
    hubRefs: Record<string, Hub>
    pagesCount: number
  }>
  user?: PromiseItem<UserExtended>
  companies?: PromiseItem<Company[]>
  children?: PromiseItem<UserExtended[]>
}

export const fieldsMap = ['user', 'companies', 'children', 'hubs']
export const typesMap = [
  PROFILE_DATA,
  PROFILE_COMPANIES,
  PROFILE_CHILDREN,
  PROFILE_HUBS,
]
