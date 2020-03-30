import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Link, useLocation } from 'react-router-dom'
import Scrollbar from '../Scrollbar'
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

const TabsComponent = ({ children }) => {
  const classes = useStyles()
  const location = useLocation()
  const [value, setValue] = useState(0)
  const shouldShow = validPaths.some(e => location.pathname.startsWith(e))
  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }
  
  if (!shouldShow) return children

  const tabs = [
    { label: 'Статьи', to: () => `/${getCachedMode()}/p/1`, tab: 'home' },
    { label: 'Новости', to: () => '/news/p/1', tab: 'news' },
    { label: 'Хабы', to: () => '/hubs', tab: 'hubs' },
    { label: 'Авторы', to: () => '/authors', tab: 'authors' },
    { label: 'Компании', to: () => '/companies', tab: 'companies' },
  ]
  
  // Magically doesn't work with the arrow syntax :p
  // No anonymous functions for today.
  function LinkTab(props) {
    return (
      <Tab
        component={Link}
        {...props}
      />
    )
  }

  return (
    <Scrollbar>
      <Paper elevation={0} className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
        >
          {tabs.map(({ to, label }, i) => <LinkTab to={to()} label={label} key={i} />)}
        </Tabs>
      </Paper>
      {children}
    </Scrollbar>
  )
}

export default TabsComponent
