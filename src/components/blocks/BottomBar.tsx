import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { Paper } from '@material-ui/core'
import { useLocation, withRouter } from 'react-router-dom'
import getCachedMode from 'src/utils/getCachedMode'
import routes from 'src/config/routes'
import { match } from 'path-to-regexp'

import { Icon28Newsfeed } from '@vkontakte/icons'
import { Icon20HomeOutline } from '@vkontakte/icons'
import { Icon28ServicesOutline } from '@vkontakte/icons'
import { Icon28SettingsOutline } from '@vkontakte/icons'
import { Icon28Profile } from '@vkontakte/icons'

interface TabObject {
  label: string
  icon: unknown
  to: () => string
  match: RegExp
  tab: string
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: 0,
    zIndex: theme.zIndex.appBar,
    width: '100%',
    willChange: 'transform',
  },
  container: {
    background: theme.palette.background.default,
    height: 52,
  },
  item: {
    fontFamily: 'Google Sans',
    fontSize: '12px',
    transitionDuration: '50ms',
  },
  selected: {
    fontSize: '12.5px !important',
  },
}))

const tabs: TabObject[] = [
  {
    label: 'Статьи',
    icon: <Icon20HomeOutline width={24} height={24} />,
    to: () => `${getCachedMode().to}/p/1`,
    match: /\/(all|top(0|10|25|50|100)|top\/daily|top\/weekly|top\/monthly|top\/yearly|top\/alltime)\/p\/([0-9]+)\/?$/,
    tab: 'home',
  },
  {
    label: 'Новости',
    icon: <Icon28Newsfeed width={24} height={24} />,
    to: () => '/news/p/1',
    tab: 'news',
    match: /\/news\/p\/([0-9]+)\/?$/,
  },
  {
    label: 'Хабы',
    icon: <Icon28ServicesOutline width={24} height={24} />,
    to: () => '/hubs/p/1',
    match: /\/hubs\/p\/([0-9]+)\/?$/,
    tab: 'hubs',
  },
  {
    label: 'Настройки',
    icon: <Icon28SettingsOutline width={24} height={24} />,
    to: () => '/settings',
    match: /\/settings\/?$/,
    tab: 'settings',
  },
  {
    label: 'Профиль',
    icon: <Icon28Profile width={24} height={24} />,
    to: () => '/companies',
    match: /\/companies\/?$/,
    tab: 'companies',
  },
]
const findPathValue = (path: string): number => {
  const res = tabs.findIndex((e) => path.match(e.match))
  return res
}

const BottomBar = ({ history }) => {
  const classes = useStyles()
  const location = useLocation()
  const [isHidden, setHidden] = React.useState(false)
  const [value, setValue] = useState<number>(findPathValue(location.pathname))
  const handleChange = (
    _event: React.ChangeEvent<unknown>,
    newValue: number
  ) => {
    setValue(newValue)
  }

  const hideAppBarHandler = (location: Location) => {
    const path = location.pathname
    const route = routes.find((e) => match(e.path)(path))

    if (!route.shouldShowAppBar) setHidden(true)
    else setHidden(false)
  }

  useEffect(() => setValue(findPathValue(location.pathname)), [
    location.pathname,
  ])

  useEffect(() => {
    hideAppBarHandler(history.location)
    const unlisten = history.listen(hideAppBarHandler)
    return () => unlisten()
  }, [history])

  // Do not render BottomBar if it is hidden by the route
  if (isHidden) return null

  return (
    <Paper elevation={2} className={classes.root}>
      <BottomNavigation
        value={value}
        onChange={handleChange}
        showLabels
        className={classes.container}
      >
        {tabs.map((e, i) => (
          <BottomNavigationAction
            key={i}
            classes={{ label: classes.item, selected: classes.selected }}
            label={e.label}
            icon={e.icon}
            onClick={() => history.push(e.to())}
          />
        ))}
      </BottomNavigation>
    </Paper>
  )
}

export default withRouter(React.memo(BottomBar))
