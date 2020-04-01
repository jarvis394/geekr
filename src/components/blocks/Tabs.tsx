import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Link, useLocation } from 'react-router-dom'
import div from '../Scrollbar'
import getCachedMode from '../../utils/getCachedMode'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default
  },
}))

const validPaths = [
  '/all',
  '/top/day/p/',
  '/top/week/p/',
  '/top/month/p',
  '/news/p/',
  '/hubs',
  '/authors',
  '/companies'
]
const isValidPath = (path: string): boolean => validPaths.some(e => path.startsWith(e))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function LinkTab(props: any) {
  return (
    <Tab
      component={Link}
      {...props}
    />
  )
}
const LinkTabMemoized = React.memo(LinkTab)

const tabs = [
  { label: 'Статьи', to: () => `/${getCachedMode()}/p/1`, tab: 'home' },
  { label: 'Новости', to: () => '/news/p/1', tab: 'news' },
  { label: 'Хабы', to: () => '/hubs', tab: 'hubs' },
  { label: 'Авторы', to: () => '/authors', tab: 'authors' },
  { label: 'Компании', to: () => '/companies', tab: 'companies' },
]
const findPathValue = (path: string): number => {
  const res = tabs.findIndex(e => path.startsWith(e.to()))
  return res < 0 ? 0 : res
}

const TabsComponent = ({ children }) => {
  const classes = useStyles()
  const location = useLocation()
  const shouldShow = isValidPath(location.pathname)
  const [value, setValue] = useState<number>(findPathValue(location.pathname))
  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }
  
  if (!shouldShow) return children

  return (
    <div>
      <Paper elevation={0} className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
        >
          {tabs.map(({ to, label }, i) => <LinkTabMemoized to={to()} label={label} key={i} />)}
        </Tabs>
      </Paper>
      {children}
    </div>
  )
}

export default React.memo(TabsComponent)
