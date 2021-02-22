import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { Paper } from '@material-ui/core'
import { useLocation, useHistory } from 'react-router-dom'
import getCachedMode from 'src/utils/getCachedMode'
import { BOTTOM_BAR_HEIGHT } from 'src/config/constants'
import { useRoute } from 'src/hooks'

import { Icon28Newsfeed } from '@vkontakte/icons'
import { Icon20HomeOutline } from '@vkontakte/icons'
import { Icon28ServicesOutline } from '@vkontakte/icons'
import { Icon28SettingsOutline } from '@vkontakte/icons'
import { Icon28Profile } from '@vkontakte/icons'
import getContrastPaperColor from 'src/utils/getContrastPaperColor'

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
    left: 0,
    zIndex: theme.zIndex.appBar,
    width: '100%',
    willChange: 'transform',
  },
  container: {
    background: getContrastPaperColor(theme),
    height: BOTTOM_BAR_HEIGHT,
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
    to: () => '/services',
    match: /\/services\/?$/,
    tab: 'services',
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
    to: () => '/me',
    match: /\/me\/?$/,
    tab: 'me',
  },
]
const findPathValue = (path: string): number => {
  const res = tabs.findIndex((e) => path.match(e.match))
  return res
}

const BottomBar = () => {
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()
  const route = useRoute()
  const [isShown, setShown] = React.useState(false)
  const [value, setValue] = useState<number>(findPathValue(location.pathname))
  const handleChange = (
    _event: React.ChangeEvent<unknown>,
    newValue: number
  ) => {
    setValue(newValue)
  }

  const go = (e: TabObject) => {
    if (history.location.pathname !== e.to()) {
      history.push(e.to())
    }
  }

  const hideAppBarHandler = (r) => {
    setShown(r.shouldShowAppBar)
  }

  useEffect(() => {
    hideAppBarHandler(route)
    setValue(findPathValue(location.pathname))
  }, [location.pathname, route])

  return isShown ? (
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
            onClick={() => go(e)}
          />
        ))}
      </BottomNavigation>
    </Paper>
  ) : null
}

export default React.memo(BottomBar)
