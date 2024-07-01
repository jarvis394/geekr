import { UserSettings } from '../interfaces'
import {
  DEFAULT_USER_SETTINGS,
  THEMES,
  USER_SETTINGS_KEY,
} from '../config/constants'

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
    // TODO: fix types
    //@ts-expect-error temporary fix
    if (!res[key]) {
      // TODO: fix types
      //@ts-expect-error temporary fix
      res[key] = DEFAULT_USER_SETTINGS[key]
    } else if (key === 'themeType') {
      const { themeType, customThemes = [] } = res
      const isThemeInDefaultThemes = THEMES.find((e) => e === themeType)
      const isThemeInCustomThemes = customThemes.find(
        (e) => e.type === themeType
      )

      if (!isThemeInDefaultThemes && !isThemeInCustomThemes) {
        res.themeType = DEFAULT_USER_SETTINGS.themeType
      }
    }
  }

  return res
}

export const set = (payload: Partial<UserSettings>): UserSettings => {
  const data = get() || DEFAULT_USER_SETTINGS

  for (const key in payload) {
    // TODO: fix types
    //@ts-expect-error temporary fix
    data[key] = payload[key]
  }

  localStorage.setItem(USER_SETTINGS_KEY, JSON.stringify(data))
  return data
}
