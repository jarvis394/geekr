import { RATING_MODES } from 'src/config/constants'
import { ModeObject } from 'src/interfaces'

export default (): ModeObject => {
  const mode = localStorage.getItem('mode')
  const topDaily = RATING_MODES.find((e) => e.mode === 'daily')
  const cachedMode = RATING_MODES.find((e) => e.mode === mode)

  if (cachedMode) return cachedMode
  if (!mode) {
    localStorage.setItem('mode', 'daily')
    return topDaily
  }

  // On an unexpected error, like, mode from localStorage is not valid
  // we want to return a default mode
  return topDaily
}
