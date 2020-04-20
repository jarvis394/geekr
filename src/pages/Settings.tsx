import * as React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { Switch, List, ListItem, ListItemText, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'src/hooks'
import { useDispatch } from 'react-redux'
import { setTheme } from 'src/store/actions/settings'

const useStyles = makeStyles((theme) => ({
  root: { width: '100%', height: '100%', maxWidth: '100vw' },
  title: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    background: theme.palette.background.default,
    '& p': {
      fontFamily: 'Google Sans',
      fontWeight: 500,
      fontSize: 24,
    },
  },
  list: {
    '& span': { fontSize: 16 },
    '& p': { fontSize: 14 },
    height: '100%',
    padding: 0,
    backgroundColor: theme.palette.background.paper,
    borderBottomLeftRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
  },
}))

const Settings = () => {
  const theme = useSelector(state => state.settings.theme)
  const dispatch = useDispatch()
  const classes = useStyles()

  const themeChange = () => {
    const newThemeType = theme.palette.type === 'light' ? 'dark' : 'light'
    dispatch(setTheme(newThemeType))
    localStorage.setItem('theme', newThemeType)
  }

  return (
    <Grid
      container
      direction="column"
      style={{ width: '100%', height: '100%' }}
    >
      <Grid item>
        <Container className={classes.title}>
          <Typography>Настройки</Typography>
        </Container>
        <Divider />
      </Grid>

      <Grid style={{ overflow: 'auto' }} item>
        <List style={{ overflow: 'auto' }} className={classes.list}>
          <ListItem button onClick={themeChange}>
            <ListItemText
              secondary={
                theme.palette.type === 'dark'
                  ? 'Сейчас включена темная тема'
                  : 'Сейчас включена светлая тема'
              }
              primary="Включить тёмную тему"
            />
            <Switch checked={theme.palette.type === 'dark'} color="primary" />
          </ListItem>
        </List>
      </Grid>
    </Grid>
  )
}

export default React.memo(Settings)
