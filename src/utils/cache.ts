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

export const shouldUpdate = (storeData) => {
  const now = Date.now()
  const shouldUpdateByTS = (d: number) => now - d >= DEFAULT_UPDATE_INTERVAL

  if (storeData) {
    return shouldUpdateByTS(storeData.lastUpdated)
  } else return true
}
