import { UserSettings } from '../interfaces'
import { DEFAULT_USER_SETTINGS, USER_SETTINGS_KEY } from '../config/constants'

// TODO: refactor to return { success: boolean, data: UserSettings }
// to show a notification that settings are being overwritten with defaults
export const get = (): UserSettings => {
  const data = localStorage.getItem(USER_SETTINGS_KEY)
  let res: UserSettings

  if (!data) return DEFAULT_USER_SETTINGS

  try {
    res = JSON.parse(data)
  } catch (e) {
    console.error('Cannot parse user settings:', e, '\nGot:', data)
    return DEFAULT_USER_SETTINGS
  }

  for (const key in DEFAULT_USER_SETTINGS) {
    if (!res[key]) {
      res[key] = DEFAULT_USER_SETTINGS[key]
    }
  }

  return res
}

export const set = (payload: Partial<UserSettings>): UserSettings => {
  const data = get() || DEFAULT_USER_SETTINGS

  for (const key in payload) {
    data[key] = payload[key]
  }

  localStorage.setItem(USER_SETTINGS_KEY, JSON.stringify(data))
  return data
}
