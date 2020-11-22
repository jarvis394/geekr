import { useLocation } from 'react-router-dom'
import { Mode } from 'src/config/constants'

export default (): Mode => {
  const location = useLocation()
  const loc = location.pathname.split('/').slice(1)

  if (loc[0] === 'all') return 'all'
  else if (
    loc[0] === 'top' &&
    ['daily', 'weekly', 'monthly', 'yearly', 'alltime'].includes(loc[1])
  )
    return loc[1] as Mode
  else return 'daily'
}
