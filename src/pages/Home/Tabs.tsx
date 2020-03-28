import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default
  },
}))

const TabsComponent = () => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  const tabs = [
    { label: 'Статьи', to: '/', tab: 'home' },
    { label: 'Новости', to: '/news/p/1', tab: 'news' },
    { label: 'Хабы', to: '/hubs', tab: 'hubs' },
    { label: 'Авторы', to: '/authors', tab: 'authors' },
    { label: 'Компании', to: '/companies', tab: 'companies' },
  ]
  
  function LinkTab(props) {
    return (
      <Tab
        component={Link}
        {...props}
      />
    )
  }

  return (
    <Paper elevation={0} className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
      >
        {tabs.map(({ to, label }, i) => <LinkTab to={to} label={label} key={i} />)}
      </Tabs>
    </Paper>
  )
}

export default TabsComponent
