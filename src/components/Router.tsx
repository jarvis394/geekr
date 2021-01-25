import * as React from 'react'
import { Switch, Route as ReactRouterRoute, useLocation } from 'react-router-dom'
import routes from 'src/config/routes'
import { Fade } from '@material-ui/core'
import ReactGA from 'react-ga'

const Route = ({ children, key, ...props }) => {
  const location = useLocation()
  
  React.useEffect(() => {
    ReactGA.set({ page: location.pathname })
    ReactGA.pageview(location.pathname)
  }, [location.pathname])
  
  return (
    <Fade in key={key}>
      <div>
        <ReactRouterRoute {...props}>{children}</ReactRouterRoute>
      </div>
    </Fade>
  )
}

const Router = () => (
  <Switch>
    {routes.map(({ path, component }, i) => (
      <Route key={i} exact path={path}>
        {component}
      </Route>
    ))}
  </Switch>
)

export default React.memo(Router)
