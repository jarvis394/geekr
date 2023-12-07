import { useLocation, matchPath } from 'react-router-dom'
import { routes } from 'src/config/routes'
import { Location } from 'history'

const useRoute = (defaultLocation?: Location<unknown>) => {
  const location = defaultLocation || useLocation()
  const path = location.pathname
  const fourOFourRoute = routes.find((e) => e.path === '/:404*')!
  const route = routes.find((e) =>
    matchPath(path, { path: e.path, exact: true })
  )
  return route || fourOFourRoute
}

export default useRoute
