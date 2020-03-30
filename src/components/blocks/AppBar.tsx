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
import { useHistory } from 'react-router-dom'
import getCachedMode from '../../utils/getCachedMode'
import WifiOffRoundedIcon from '@material-ui/icons/WifiOffRounded'
import { Offline } from 'react-detect-offline'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    position: 'relative',
    height: 48,
    flexGrow: 1,
    borderBottom: '1px solid ' + theme.palette.divider,
  },
  container: { maxWidth, padding: 0 },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
    fontWeight: 800,
    height: '100%',
    alignItems: 'center',
    display: 'flex',
  },
  offline: {
    color: theme.palette.text.disabled,
    marginLeft: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  linkTypography: {
    flexGrow: 1,
    display: 'flex',
    height: '100%',
    alignItems: 'center',
  },
}))

const Component = ({ setState }) => {
  const classes = useStyles()
  const history = useHistory()

  return (
    <AppBar className={classes.root} elevation={0}>
      <Container className={classes.container}>
        <Toolbar style={{ minHeight: 'unset', height: 48 }}>
          <Typography variant="h6" className={classes.linkTypography}>
            <Link
              onClick={() => setState(prev => ({ ...prev, posts: {} }))}
              to={`/${getCachedMode()}/p/1`}
              className={classes.link}
            >
              habra.
              <Offline>
                <WifiOffRoundedIcon className={classes.offline} />
              </Offline>
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
  )
}

export default React.memo(Component)
