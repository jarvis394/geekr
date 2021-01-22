import * as React from 'react'
import { Switch, Route as ReactRouterRoute } from 'react-router-dom'
import routes from 'src/config/routes'
import { Fade } from '@material-ui/core'

const Route = ({ children, key, ...props }) => {
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
