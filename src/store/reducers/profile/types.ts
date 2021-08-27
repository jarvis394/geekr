import { Company, Hub } from 'src/interfaces'
import {
  UserChildren,
  UserCompanies,
  UserExtended,
  UserHubs,
  UserWhois,
} from 'src/interfaces/User'

export const PROFILE = 'PROFILE_'
export const PROFILE_CARD = PROFILE + 'CARD_'
export const PROFILE_WHOIS = PROFILE + 'WHOIS_'
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
  hubs?: PromiseItem<UserHubs>
  card?: PromiseItem<UserExtended>
  whois?: PromiseItem<UserWhois>
  companies?: PromiseItem<UserCompanies>
  children?: PromiseItem<UserChildren>
}

export const fieldsMap = ['card', 'whois', 'companies', 'children', 'hubs']
export const typesMap = [
  PROFILE_CARD,
  PROFILE_WHOIS,
  PROFILE_COMPANIES,
  PROFILE_CHILDREN,
  PROFILE_HUBS,
]
