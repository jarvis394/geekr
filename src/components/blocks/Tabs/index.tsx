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

function LinkTab({ isLink, ...props }) {
  return <Tab component={isLink ? Link : 'div'} {...props} />
}
const LinkTabMemoized = React.memo(LinkTab)

export interface TabObject {
  label: React.ReactElement | string
  to: () => string
  match: string[] | string | RegExp | RegExp[]
  tab: string
}

interface Params {
  tabs: TabObject[]
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void
  value: number
  hidden: boolean
  shouldUseLinks?: boolean
}

const TabsComponent = ({
  tabs,
  onChange,
  value,
  hidden,
  shouldUseLinks = true,
}: Params) => {
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
        <LinkTabMemoized
          isLink={shouldUseLinks}
          to={to()}
          label={label}
          key={i}
        />
      ))}
    </Tabs>
  )
}

export default React.memo(TabsComponent)
