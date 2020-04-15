import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
  },
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function LinkTab(props: any) {
  return <Tab component={Link} {...props} />
}
const LinkTabMemoized = React.memo(LinkTab)

const TabsComponent = ({ tabs, onChange, value, hidden }) => {
  const classes = useStyles()

  if (hidden) return null

  return (
    <Tabs
      value={value}
      onChange={onChange}
      indicatorColor="primary"
      textColor="primary"
      variant="scrollable"
      className={classes.root}
    >
      {tabs.map(({ to, label }, i: number) => (
        <LinkTabMemoized to={to()} label={label} key={i} />
      ))}
    </Tabs>
  )
}

export default React.memo(TabsComponent)
