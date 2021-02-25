import * as React from 'react'
import { Switch, Route } from 'react-router-dom'
import routes from 'src/config/routes'
import useAnalytics from 'src/hooks/useAnalytics'

const Router = () => {
  useAnalytics()

  return (
    <Switch>
      {routes.map(({ path, component }, i) => (
        <Route key={i} exact path={path}>
          {component}
        </Route>
      ))}
    </Switch>
  )
}

export default React.memo(Router)
