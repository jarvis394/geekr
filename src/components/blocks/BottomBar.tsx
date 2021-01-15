import React, { useState, useEffect } from 'react'
import { lighten, makeStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'
import EventNoteRoundedIcon from '@material-ui/icons/EventNoteRounded'
import DeviceHubRoundedIcon from '@material-ui/icons/DeviceHubRounded'
import PeopleOutlineRoundedIcon from '@material-ui/icons/PeopleOutlineRounded'
import ApartmentRoundedIcon from '@material-ui/icons/ApartmentRounded'
import { Paper } from '@material-ui/core'
import { useLocation, useHistory } from 'react-router-dom'
import getCachedMode from 'src/utils/getCachedMode'

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
    background: lighten(theme.palette.background.paper, 0.07),
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
    icon: <HomeRoundedIcon />,
    to: () => `${getCachedMode().to}/p/1`,
    match: /\/(all|top(0|10|25|50|100)|top\/daily|top\/weekly|top\/monthly|top\/yearly|top\/alltime)\/p\/([0-9]+)\/?$/,
    tab: 'home',
  },
  {
    label: 'Новости',
    icon: <EventNoteRoundedIcon />,
    to: () => '/news/p/1',
    tab: 'news',
    match: /\/news\/p\/([0-9]+)\/?$/,
  },
  {
    label: 'Хабы',
    icon: <DeviceHubRoundedIcon />,
    to: () => '/hubs/p/1',
    match: /\/hubs\/p\/([0-9]+)\/?$/,
    tab: 'hubs',
  },
  {
    label: 'Авторы',
    icon: <PeopleOutlineRoundedIcon />,
    to: () => '/authors',
    match: /\/authors\/?$/,
    tab: 'authors',
  },
  {
    label: 'Компании',
    icon: <ApartmentRoundedIcon />,
    to: () => '/companies',
    match: /\/companies\/?$/,
    tab: 'companies',
  },
]
const findPathValue = (path: string): number => {
  const res = tabs.findIndex((e) => path.match(e.match))
  return res
}

const BottomBar = () => {
  const classes = useStyles()
  const location = useLocation()
  const history = useHistory()
  const [value, setValue] = useState<number>(findPathValue(location.pathname))
  const handleChange = (
    _event: React.ChangeEvent<unknown>,
    newValue: number
  ) => {
    setValue(newValue)
  }

  useEffect(() => setValue(findPathValue(location.pathname)), [
    location.pathname,
  ])

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

export default React.memo(BottomBar)
