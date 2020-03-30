import * as React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import Container from '@material-ui/core/Container'
import { MIN_WIDTH as maxWidth } from '../../config/constants'
import PermIdentityRoundedIcon from '@material-ui/icons/PermIdentityRounded'
import SearchRoundedIcon from '@material-ui/icons/SearchRounded'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Slide from '@material-ui/core/Slide'
import { useHistory } from 'react-router-dom'
import getCachedMode from '../../utils/getCachedMode'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    height: 48,
    position: 'relative',
    flexGrow: 1,
    borderBottom: '1px solid ' + theme.palette.divider
  },
  container: { maxWidth, padding: 0 },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
    fontWeight: 800,
  }
}))

const HideOnScroll = ({ children }) => {
  const trigger = useScrollTrigger({ target: window })
  
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

const Component = ({ setState }) => {
  const classes = useStyles()
  const history = useHistory()

  return (
    <HideOnScroll>
      <AppBar className={classes.root} elevation={0}>
        <Container className={classes.container}>
          <Toolbar style={{ minHeight: 'unset', height: 48 }}>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              <Link onClick={() => setState(prev => ({ ...prev, posts: {} }))} to={`/${getCachedMode()}/p/1`} className={classes.link}>
                habra.
              </Link>
            </Typography>
            <IconButton onClick={() => history.push('/search')}>
              <SearchRoundedIcon />
            </IconButton>
            <IconButton onClick={() => history.push('/settings')}>
              <SettingsOutlinedIcon />
            </IconButton>
            <IconButton>
              <PermIdentityRoundedIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  )
}

export default Component
