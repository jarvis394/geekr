import { DEFAULT_UPDATE_INTERVAL } from 'src/config/constants'

// localStorage: {
//   habra_article_{id}: Post(id),  <- Cached article
//   habra_posts: {                 <- Cached posts on the Home page
//     [mode]: {
//       data: {
//         [page]: Posts(page)
//       },
//       pageCount: number,
//       lastUpdateTS: Date
//     }
//   },
//   habra_news: {                  <- Cached news
//     data: {
//       [page]: Posts(page)
//     },
//     pageCount: number,
//     lastUpdateTS: Date,
//     block: NewsItem[]
//   }
// }

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
  const shouldUpdate = storeData ? shouldUpdateByTS(storeData.lastUpdate) : cachedData ? shouldUpdateByTS(cachedData.lastUpdate) : true
  
  console.log(storeData, cachedData)
  
  return shouldUpdate
}

export const NEWS = 'habra_news'
export const getNews = () => {
  return parse(localStorage.getItem(NEWS))
}
