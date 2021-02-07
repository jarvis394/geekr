import * as React from 'react'
import { useRoute } from 'src/hooks'

const RouterTitleChange = () => {
  const route = useRoute()
  const newTitle = route.title ? route.title + ' | habra.' : 'habra.'
  if (document.title !== newTitle) document.title = newTitle

  return null
}

export default React.memo(RouterTitleChange)
