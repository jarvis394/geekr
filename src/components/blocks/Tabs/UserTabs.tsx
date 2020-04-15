import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import Tabs from '.'
import { UserExtended as UserExtendedObject } from 'src/interfaces/User'
import { useTheme, Theme } from '@material-ui/core'

interface TabObject {
  label: React.ReactElement | string
  to: () => string
  match: RegExp
  tab: string
}
const Counter = ({ children }) => {
  const theme = useTheme()
  return (
    <span
      style={{
        color: theme.palette.primary.main,
        marginLeft: theme.spacing(1),
      }}
    >
      {children}
    </span>
  )
}
const generateTabs = (theme: Theme, user: UserExtendedObject): TabObject[] => [
  {
    label: 'Профиль',
    to: () => `/user/${user.login}/`,
    match: /\/user\/(\w|\d)+\/?$/,
    tab: 'profile',
  },
  {
    label: (
      <>
        Публикации
        <Counter>{user.counters.posts}</Counter>
      </>
    ),
    to: () => `/user/${user.login}/articles/1`,
    match: /\/user\/(\w|\d)+\/articles\/([0-9]+)\/?$/,
    tab: 'articles',
  },
  {
    label: (
      <>
        Комментарии
        <Counter>{user.counters.comments}</Counter>
      </>
    ),
    to: () => `/user/${user.login}/comments/1`,
    match: /\/user\/(\w|\d)+\/comments\/([0-9]+)\/?$/,
    tab: 'comments',
  },
  {
    label: (
      <>
        Закладки
        <Counter>{user.counters.favorites}</Counter>
      </>
    ),
    to: () => `/user/${user.login}/favorites/articles/1`,
    match: /\/user\/(\w|\d)+\/favorites\/(articles|comments)\/([0-9]+)\/?$/,
    tab: 'favorites',
  },
]

const UserTabs = ({ user }: { user: UserExtendedObject }) => {
  const theme = useTheme()
  const tabs = useMemo(() => generateTabs(theme, user), [theme, user])
  const findPath = (path: string): TabObject => {
    return tabs.find((e) => path.match(e.match))
  }
  const findPathValue = useCallback(
    (path: string): number => {
      const res = tabs.findIndex((e) => path.match(e.match))
      return res < 0 ? 0 : res
    },
    [tabs]
  )
  const isValidPath = (path: string): boolean => !!findPath(path)

  const location = useLocation()
  const shouldShow = isValidPath(location.pathname)
  const getValue = useCallback(() => findPathValue(location.pathname), [
    location.pathname,
    findPathValue,
  ])
  const [value, setValue] = useState<number>(getValue())
  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  useEffect(() => setValue(getValue()), [location.pathname, getValue])

  return (
    <Tabs
      onChange={handleChange}
      tabs={tabs}
      hidden={!shouldShow}
      value={value}
    />
  )
}

export default UserTabs
