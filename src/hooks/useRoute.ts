import { match } from 'path-to-regexp'
import { useLocation } from 'react-router'
import routes from 'src/config/routes'

const useRoute = () => {
  const location = useLocation()
  const path = location.pathname
  const route = routes.find((e) => match(e.path)(path))
  return route || routes.find((e) => e.path === '/:404*')
}

export default useRoute
