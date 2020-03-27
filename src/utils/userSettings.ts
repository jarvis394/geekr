import { UserSettings } from '../interfaces'
import { DEFAULT_USER_SETTINGS } from '../config/constants'

export const get = (): UserSettings | false => {
  const data = localStorage.getItem('habra_userSettings')
  let res: UserSettings

  if (!data) return false

  try {
    res = JSON.parse(data)
  } catch (e) {
    console.error('Cannot parse user settings:', e, '\nGot:', data)
    return false
  }

  return res
}

export const set = (key: string, value: string): void => {
  const data = get() || DEFAULT_USER_SETTINGS
  data[key] = value

  localStorage.setItem('habra_userSettings', JSON.stringify(data))
}
