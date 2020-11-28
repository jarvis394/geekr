import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Tabs from '.'
import { UserExtended as UserExtendedObject } from 'src/interfaces/User'
import { useTheme, Fade } from '@material-ui/core'
import { useSelector } from 'src/hooks'

interface TabObject {
  label: React.ReactElement | string
  to: () => string
  match: RegExp
  tab: string
}

const Counter = ({ children }) => {
  const theme = useTheme()
  return (
    <Fade in>
      <div
        style={{
          color: theme.palette.primary.dark,
          marginLeft: theme.spacing(1),
        }}
      >
        {children}
      </div>
    </Fade>
  )
}

const generateTabs = (user: UserExtendedObject): TabObject[] => [
  {
    label: 'Профиль',
    to: () => (user ? `/user/${user.login}/` : null),
    match: /\/user\/(\w|\d)+\/?$/,
    tab: 'profile',
  },
  {
    label: (
      <>
        Публикации
        {user && <Counter>{user.counters.posts}</Counter>}
      </>
    ),
    to: () => (user ? `/user/${user.login}/articles/1` : null),
    match: /\/user\/(\w|\d)+\/articles\/([0-9]+)\/?$/,
    tab: 'articles',
  },
  {
    label: (
      <>
        Комментарии
        {user && <Counter>{user.counters.comments}</Counter>}
      </>
    ),
    to: () => (user ? `/user/${user.login}/comments/1` : null),
    match: /\/user\/(\w|\d)+\/comments\/([0-9]+)\/?$/,
    tab: 'comments',
  },
  {
    label: (
      <>
        Закладки
        {user && <Counter>{user.counters.favorites}</Counter>}
      </>
    ),
    to: () => (user ? `/user/${user.login}/favorites/articles/1` : null),
    match: /\/user\/(\w|\d)+\/favorites\/(articles|comments)\/([0-9]+)\/?$/,
    tab: 'favorites',
  },
]

const UserTabs = () => {
  const user = useSelector((state) => state.profile.profile.user.data)
  const tabs = generateTabs(user)
  const findPath = (path: string): TabObject => {
    return tabs.find((e) => path.match(e.match))
  }
  const findPathValue = React.useCallback(
    (path: string): number => {
      const res = tabs.findIndex((e) => path.match(e.match))
      return res < 0 ? 0 : res
    },
    [tabs]
  )
  const isValidPath = (path: string): boolean => !!findPath(path)
  const location = useLocation()
  const shouldShow = isValidPath(location.pathname)
  const [value, setValue] = useState<number>(findPathValue(location.pathname))
  const handleChange = (
    _event: React.ChangeEvent<unknown>,
    newValue: number
  ) => {
    setValue(newValue)
  }

  useEffect(() => setValue(findPathValue(location.pathname)), [
    location.pathname,
    findPathValue,
  ])

  return (
    <Tabs
      onChange={handleChange}
      tabs={tabs}
      shouldUseLinks={!!user}
      hidden={!shouldShow}
      value={value}
    />
  )
}

export default UserTabs
