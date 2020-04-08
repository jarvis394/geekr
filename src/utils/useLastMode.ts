import { useLocation } from 'react-router-dom'
import { Mode } from '../api/getPosts'

export default () => {
  const location = useLocation()
  const loc = location.pathname.split('/').slice(1)

  if (loc[0] === 'all') return 'all'
  else if (loc[0] === 'top' && ['day', 'week', 'month'].includes(loc[1]))
    return loc[1] as Mode
  else return 'day'
}
