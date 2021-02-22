import { match } from 'path-to-regexp'
import { useLocation } from 'react-router-dom'
import routes from 'src/config/routes'

const useRoute = () => {
  const location = useLocation()
  const path = location.pathname
  const fourOFourRoute = routes.find((e) => e.path === '/:404*')
  const route = routes.find((e) => match(e.path)(path))
  return route || fourOFourRoute
}

export default useRoute
