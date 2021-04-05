import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { fade, Typography } from '@material-ui/core'
import OutsidePage from 'src/components/blocks/OutsidePage'
import getContrastPaperColor from 'src/utils/getContrastPaperColor'

import { Icon24PaletteOutline } from '@vkontakte/icons'
import { Icon24HideOutline } from '@vkontakte/icons'
import { Icon24ChevronRight } from '@vkontakte/icons'
import { Icon243SquareOutline } from '@vkontakte/icons'
import { Icon28ArticleOutline } from '@vkontakte/icons'
import { Icon28GlobeOutline } from '@vkontakte/icons'
import isDarkTheme from 'src/utils/isDarkTheme'

const items = [
  {
    icon: Icon24PaletteOutline,
    to: '/appearance',
    text: 'Внешний вид',
  },
  {
    icon: Icon24HideOutline,
    to: '/blacklist',
    text: 'Чёрный список',
  },
  {
    icon: Icon243SquareOutline,
    to: '/interface',
    text: 'Настройки интерфейса',
  },
  {
    icon: Icon28ArticleOutline,
    to: '/article',
    text: 'Параметры чтения',
  },
  {
    icon: Icon28GlobeOutline,
    to: '/language',
    text: 'Язык приложения',
  },
]

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: getContrastPaperColor(theme),
  },
  link: {
    display: 'flex',
    padding: theme.spacing(1.5, 2),
    backgroundColor: getContrastPaperColor(theme),
    textDecoration: 'none',
    color: theme.palette.text.primary,
    alignItems: 'center',
    '-webkit-tap-highlight-color': 'transparent !important',
    '&:hover': {
      backgroundColor: fade(theme.palette.common[isDarkTheme(theme) ? 'white' : 'black'], 0.05),
    },
    '&:active': {
      background: fade(theme.palette.common[isDarkTheme(theme) ? 'white' : 'black'], 0.2),
    },
  },
  linkText: {
    marginLeft: theme.spacing(1.5),
    fontSize: 16,
    flexGrow: 1,
  },
  linkIcon: {
    color: theme.palette.primary.main,
  },
  linkIconChevronRight: {
    color: theme.palette.text.hint,
  },
}))

const Settings = () => {
  const classes = useStyles()

  return (
    <OutsidePage headerText={'Настройки'} disableShrinking>
      <div className={classes.root}>
        {items.map((e, i) => (
          <Link to={{
            state: { from: '/settings' },
            pathname: '/settings' + e.to,
          }} key={i} className={classes.link}>
            <e.icon className={classes.linkIcon} width={28} height={28} />
            <Typography className={classes.linkText}>{e.text}</Typography>
            <Icon24ChevronRight
              className={classes.linkIconChevronRight}
              width={18}
              height={18}
            />
          </Link>
        ))}
      </div>
    </OutsidePage>
  )
}

export default Settings
