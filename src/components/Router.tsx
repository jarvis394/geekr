import * as React from 'react'
import { Switch, Route } from 'react-router-dom'
import makeStyles from '@material-ui/styles/makeStyles'
import { Theme, lighten, darken } from '@material-ui/core/styles'
import generateTheme from 'src/config/theme'
import routes from 'src/config/routes'

const configTheme = generateTheme()
const isDarkTheme = (t: typeof configTheme) => t.palette.type === 'dark'
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.type === 'dark' ? '#0d0d0d' : '#f2f4f6',
    color: theme.palette.text.primary,
    margin: 0,
    fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, Arial, sans-serif',
    lineHeight: 1.5,
    '&::-webkit-scrollbar': {
      width: 15,
      height: 10,
      background: isDarkTheme(theme)
        ? lighten(theme.palette.background.default, 0.03)
        : theme.palette.background.paper,
      border: '1px solid ' + darken(theme.palette.background.paper, 0.05),
    },
    '&::-webkit-scrollbar-thumb': {
      minHeight: 28,
      background: isDarkTheme(theme)
        ? lighten(theme.palette.background.paper, 0.08)
        : darken(theme.palette.background.paper, 0.08),
      transition: '0.1s',
      '&:hover': {
        background: isDarkTheme(theme)
          ? lighten(theme.palette.background.paper, 0.1)
          : darken(theme.palette.background.paper, 0.1),
      },
      '&:active': {
        background: isDarkTheme(theme)
          ? lighten(theme.palette.background.paper, 0.2)
          : darken(theme.palette.background.paper, 0.2),
      },
    },
  },
}))

const Router = () => {
  const classes = useStyles()

  // Set root classes
  document.body.className = classes.root

  return (
    <Switch>
      {routes.map(({ path, component }, i) => (
        <Route key={i} exact path={path}>
          {component}
        </Route>
      ))}
    </Switch>
  )
}

export default React.memo(Router)
