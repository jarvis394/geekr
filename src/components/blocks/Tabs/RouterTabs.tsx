import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Tabs from '.'
import getCachedMode from 'src/utils/getCachedMode'

interface TabObject {
  label: string
  to: () => string
  match: RegExp
  tab: string
}

const tabs: TabObject[] = [
  {
    label: 'Статьи',
    to: () => `${getCachedMode().to}/p/1`,
    match: /\/(all|top(0|10|25|50|100)|top\/daily|top\/weekly|top\/monthly|top\/yearly|top\/alltime)\/p\/([0-9]+)\/?$/,
    tab: 'home',
  },
  {
    label: 'Новости',
    to: () => '/news/p/1',
    tab: 'news',
    match: /\/news\/p\/([0-9]+)\/?$/,
  },
  {
    label: 'Хабы',
    to: () => '/hubs/p/1',
    match: /\/hubs\/p\/([0-9]+)\/?$/,
    tab: 'hubs',
  },
  {
    label: 'Авторы',
    to: () => '/authors',
    match: /\/authors\/?$/,
    tab: 'authors',
  },
  {
    label: 'Компании',
    to: () => '/companies',
    match: /\/companies\/?$/,
    tab: 'companies',
  },
]

const findPath = (path: string): TabObject => {
  return tabs.find((e) => path.match(e.match))
}
const findPathValue = (path: string): number => {
  const res = tabs.findIndex((e) => path.match(e.match))
  return res
}
const isValidPath = (path: string): boolean => !!findPath(path)

const RouterTabs = () => {
  const location = useLocation()
  const isHidden = !isValidPath(location.pathname)
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
    <Tabs
      shouldUseLinks
      onChange={handleChange}
      tabs={tabs}
      hidden={isHidden}
      value={value < 0 ? 0 : value}
    />
  )
}

export default RouterTabs
