import { DEFAULT_UPDATE_INTERVAL } from 'src/config/constants'
import { Posts } from 'src/interfaces'

export const parse = (data: string) => {
  if (!data) return false

  try {
    return JSON.parse(data)
  } catch (e) {
    console.error('Cannot parse object:', e, '\nGot:', data)
    return false
  }
}

export const shouldUpdate = (storeData: Omit<Posts, 'pagesCount'>) => {
  const now = Date.now()
  const shouldUpdateByTS = (d: number) => now - d >= DEFAULT_UPDATE_INTERVAL

  if (storeData) {
    // TODO: fix types
    //@ts-expect-error temporary fix
    return shouldUpdateByTS(storeData.lastUpdated)
  } else return true
}
