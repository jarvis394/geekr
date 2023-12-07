import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
  ButtonBase,
  IconButton,
  Typography,
  useMediaQuery,
} from '@material-ui/core'
import {
  MIDDLE_WIDTH,
  BOTTOM_BAR_HEIGHT,
  MIN_WIDTH,
  RUVDS_MODAL_WAS_SHOWN,
} from 'src/config/constants'
import { useRoute } from 'src/hooks'
import RUVDSLogo from 'src/components/svg/RUVDSLogo'
import { Icon20Clear } from '@vkontakte/icons'
import { Icon16Chevron } from '@vkontakte/icons'

const useStyles = makeStyles((theme) => ({
  rootWrapper: {
    padding: theme.spacing(1.8, 2),
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    zIndex: theme.zIndex.drawer + 1,
    [theme.breakpoints.up(MIN_WIDTH)]: {
      right: 0,
    },
    pointerEvents: 'none',
    bottom: 0,
    width: `calc(100% - ${theme.spacing(2) * 2}px)`,
    transitionDuration: '0.1s',
    transitionTimingFunction: 'cubic-bezier(0, 0.75, 0, 0.9)',
    [theme.breakpoints.up(MIDDLE_WIDTH)]: {
      display: 'none',
    },
  },
  root: {
    pointerEvents: 'auto',
    backgroundColor: '#4B8FFF',
    borderRadius: 8,
    marginBottom: 0,
    padding: theme.spacing(1.5),
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    textAlign: 'initial',
    maxWidth: 520,
    width: '100%',
    position: 'relative',
    boxShadow:
      '0px 3px 5px -1px rgb(0 0 0 / 10%), 0px 6px 10px 0px rgb(0 0 0 / 4%), 0px 1px 18px 0px rgb(0 0 0 / 2%)',
  },
  svg: {
    width: 48,
    height: 48,
  },
  title: {
    fontFamily: 'Google Sans',
    fontSize: 18,
    fontWeight: 600,
    color: 'white',
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  text: {
    color: 'white',
    marginTop: theme.spacing(0.5),
    fontSize: 14,
  },
  linkButtonWrapper: {
    marginTop: theme.spacing(1.5),
    '-webkit-tap-highlight-color': 'transparent !important',
    color: theme.palette.getContrastText('#ffffff'),
    textDecoration: 'none',
    display: 'flex',
  },
  linkButton: {
    backgroundColor: 'white',
    padding: theme.spacing(1, 1.5),
    fontFamily: 'Google Sans',
    fontWeight: 600,
    borderRadius: 6,
    transitionDuration: '50ms',
    '&:active': {
      backgroundColor: '#cccccc',
    },
  },
  linkButtonIcon: {
    marginLeft: theme.spacing(1),
  },
}))

const RUVDSPromoNotification = () => {
  const classes = useStyles()
  const theme = useTheme()
  const route = useRoute()
  const shouldHide = localStorage.getItem(RUVDS_MODAL_WAS_SHOWN) === 'true'
  const [isHidden, setIsHidden] = useState(shouldHide)
  const match = useMediaQuery(theme.breakpoints.up(MIDDLE_WIDTH), {
    noSsr: true,
  })
  const noBottomMargin = !route.shouldShowAppBar || match
  const handleClose = () => {
    localStorage.setItem(RUVDS_MODAL_WAS_SHOWN, 'true')
    setIsHidden(true)
  }

  if (isHidden) return null

  return (
    <div
      className={classes.rootWrapper}
      style={{
        transform: `translateY(calc(${
          noBottomMargin ? 0 : -1 * BOTTOM_BAR_HEIGHT
        }px + env(safe-area-inset-bottom, 0px)))`,
      }}
    >
      <div className={classes.root}>
        <IconButton className={classes.closeButton} onClick={handleClose}>
          <Icon20Clear width={16} height={16} />
        </IconButton>
        <div className={classes.flexContainer}>
          <RUVDSLogo fill="white" className={classes.svg} />
        </div>
        <Typography className={classes.title}>
          Наш сервер теперь на RUVDS
        </Typography>
        <Typography className={classes.text}>
          Новые мощности. Быстрая загрузка контента. Без промедлений.
        </Typography>
        <a
          className={classes.linkButtonWrapper}
          href="https://ruvds.com/ru-rub"
          rel="noreferrer"
          target="_blank"
        >
          <ButtonBase
            className={classes.linkButton}
            disableRipple
            disableTouchRipple
          >
            Посмотреть предложения
            <Icon16Chevron className={classes.linkButtonIcon} height={16} />
          </ButtonBase>
        </a>
      </div>
    </div>
  )
}

export default RUVDSPromoNotification
