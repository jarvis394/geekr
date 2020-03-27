import { UserSettings } from '../interfaces'

export default (): UserSettings | false => {
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
