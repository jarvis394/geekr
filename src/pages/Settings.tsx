import * as React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { List, ListItem, ListItemText, Grid } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'src/hooks'
import { useDispatch } from 'react-redux'
import { setTheme } from 'src/store/actions/settings'
import { THEMES, PaletteType, THEME_NAMES } from 'src/config/constants'

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
  const themeType = useSelector((state) => state.settings.themeType)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>()
  const themeName = THEME_NAMES[themeType][0].toLowerCase() + THEME_NAMES[themeType].slice(1)
  const dispatch = useDispatch()
  const classes = useStyles()

  const themeChange = (themeType: PaletteType) => {
    dispatch(setTheme(themeType))
    localStorage.setItem('theme', themeType)
  }

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuItemClick = (
    _e: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    themeChange(THEMES[index])
    setAnchorEl(null)
  }

  const handleClose = () => {
    setAnchorEl(null)
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
          <ListItem
            aria-haspopup="true"
            aria-controls="theme-menu"
            button
            onClick={handleClickListItem}
          >
            <ListItemText
              primary="Выбрать тему"
              secondary={`Сейчас ${themeType === 'sepia' ? 'выбран' : 'выбрана'} ${themeName}`}
            />
          </ListItem>
        </List>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          id="theme-menu"
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {THEMES.map((option, index) => (
            <MenuItem
              style={{ minWidth: 256 }}
              key={option}
              selected={THEMES[index] === themeType}
              onClick={(event) => handleMenuItemClick(event, index)}
            >
              {THEME_NAMES[option]}
            </MenuItem>
          ))}
        </Menu>
      </Grid>
    </Grid>
  )
}

export default React.memo(Settings)
