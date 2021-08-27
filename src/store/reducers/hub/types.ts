export const HUB_PREFIX = 'HUB_'
export const GET_PROFILE = HUB_PREFIX + 'GET_PROFILE'
export const GET_NEWS = HUB_PREFIX + 'GET_NEWS'
export const GET_POSTS = HUB_PREFIX + 'GET_POSTS'
export const GET_AUTHORS = HUB_PREFIX + 'GET_AUTHORS'
export const GET_COMPANIES = HUB_PREFIX + 'GET_COMPANIES'

export const typeCorrespondings = {
  [GET_PROFILE]: 'profile',
  [GET_NEWS]: 'news',
  [GET_POSTS]: 'posts',
  [GET_AUTHORS]: 'authors',
  [GET_COMPANIES]: 'companies',
}
