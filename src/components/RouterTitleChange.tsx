import * as React from 'react'
import { withRouter } from 'react-router-dom'
import routes from 'src/config/routes'
import { match } from 'path-to-regexp'

const RouterTitleChange = ({ history }) => {
  React.useEffect(() => {
    const unlisten = history.listen((location: Location) => {
      const path = location.pathname
      const route = routes.find((e) => match(e.path)(path))
      const newTitle = route.title ? route.title + ' | habra.' : document.title
      if (document.title !== newTitle) document.title = newTitle
    })

    return () => unlisten()
  }, [history])

  return null
}

export default withRouter(RouterTitleChange)
