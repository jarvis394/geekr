import { useLocation } from 'react-router-dom'
import { Mode, RATING_MODES } from 'src/config/constants'

export default (): Mode => {
  const location = useLocation()
  const mode = RATING_MODES.find(e => location.pathname.startsWith(e.to))
  return mode.mode || 'daily'
}
