import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { fade, Typography, useTheme } from '@material-ui/core'
import OutsidePage from 'src/components/blocks/OutsidePage'
import getContrastPaperColor from 'src/utils/getContrastPaperColor'
import isDarkTheme from 'src/utils/isDarkTheme'
import { MIN_WIDTH } from 'src/config/constants'
import LinkToOutsidePage from 'src/components/blocks/LinkToOutsidePage'

import { Icon24PaletteOutline } from '@vkontakte/icons'
import { Icon24HideOutline } from '@vkontakte/icons'
import { Icon24ChevronRight } from '@vkontakte/icons'
import { Icon243SquareOutline } from '@vkontakte/icons'
import { Icon28ArticleOutline } from '@vkontakte/icons'
import { Icon28GlobeOutline } from '@vkontakte/icons'
import { Icon28PrivacyOutline } from '@vkontakte/icons'

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
    to: '/reader',
    text: 'Параметры чтения',
  },
  {
    icon: Icon28PrivacyOutline,
    to: '/privacy',
    text: 'Приватность',
  },
  {
    icon: Icon28GlobeOutline,
    to: '/language',
    text: 'Настройки языка',
  },
]

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(1.5),
    [theme.breakpoints.up(MIN_WIDTH)]: {
      padding: theme.spacing(1, 0),
      borderRadius: 8,
    },
  },
  link: {
    display: 'flex',
    padding: theme.spacing(1.5, 2),
    textDecoration: 'none',
    color: theme.palette.text.primary,
    alignItems: 'center',
    '-webkit-tap-highlight-color': 'transparent !important',
    '&:hover': {
      backgroundColor: fade(
        theme.palette.common[isDarkTheme(theme) ? 'white' : 'black'],
        0.05
      ),
    },
    '&:active': {
      background: fade(
        theme.palette.common[isDarkTheme(theme) ? 'white' : 'black'],
        0.2
      ),
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
  const theme = useTheme()
  
  return (
    <OutsidePage
      headerText={'Настройки'}
      disableShrinking
      backgroundColor={theme.palette.background.paper}
    >
      <div className={classes.root}>
        {items.map((e, i) => (
          <LinkToOutsidePage
            to={'/settings' + e.to}
            key={i}
            className={classes.link}
          >
            <e.icon className={classes.linkIcon} width={28} height={28} />
            <Typography className={classes.linkText}>{e.text}</Typography>
            <Icon24ChevronRight
              className={classes.linkIconChevronRight}
              width={18}
              height={18}
            />
          </LinkToOutsidePage>
        ))}
      </div>
    </OutsidePage>
  )
}

export default React.memo(Settings)
