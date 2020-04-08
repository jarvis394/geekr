import { DEFAULT_UPDATE_INTERVAL } from 'src/config/constants'

export const parse = (data: string) => {
  if (!data) return false

  try {
    return JSON.parse(data)
  } catch (e) {
    console.error('Cannot parse object:', e, '\nGot:', data)
    return false
  }
}

export const shouldUpdate = (storeData, cachedData) => {
  const now = Date.now()
  const shouldUpdateByTS = (d: number) => now - d >= DEFAULT_UPDATE_INTERVAL

  if (storeData) {
    return shouldUpdateByTS(storeData.lastUpdated)
  } else if (cachedData) {
    return shouldUpdateByTS(cachedData.lastUpdated)
  } else return true
}

export const NEWS = 'habra_news'
export const NEWS_PROMO = NEWS + '_promo'
export const getNews = () => parse(localStorage.getItem(NEWS))
export const getNewsPromo = () => parse(localStorage.getItem(NEWS_PROMO))

export const HOME = 'habra_home'
export const getPosts = () => parse(localStorage.getItem(HOME))
