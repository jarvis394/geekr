import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { IconButton, Typography, useMediaQuery } from '@material-ui/core'
import {
  MIDDLE_WIDTH,
  BOTTOM_BAR_HEIGHT,
  MIN_WIDTH,
  HALLOWEEN_MODAL_WAS_SHOWN,
} from 'src/config/constants'
import { useRoute } from 'src/hooks'
import { Icon20Clear } from '@vkontakte/icons'
import BatIcon from 'src/components/svg/Bat'

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
    backgroundColor: '#eb4b2b',
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
    width: 156,
    fill: 'rgba(0, 0, 0, 0.1)',
    position: 'absolute',
    userSelect: 'none',
    pointerEvents: 'none',
    top: -8,
    left: -24,
    transform: 'rotate(-30deg)',
    height: 'auto',
    zIndex: 0,
  },
  title: {
    fontFamily: 'Google Sans',
    fontSize: 18,
    fontWeight: 600,
    color: 'white',
    zIndex: 1,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    color: 'rgba(255, 255, 255, 0.5)',
    zIndex: 2,
  },
  text: {
    color: 'white',
    marginTop: theme.spacing(0.5),
    fontSize: 14,
    zIndex: 1,
    position: 'relative',
  },
}))

const HalloweenNotification = () => {
  const classes = useStyles()
  const theme = useTheme()
  const route = useRoute()
  const shouldHide = localStorage.getItem(HALLOWEEN_MODAL_WAS_SHOWN) === 'true'
  const [isHidden, setIsHidden] = useState(shouldHide)
  const match = useMediaQuery(theme.breakpoints.up(MIDDLE_WIDTH), {
    noSsr: true,
  })
  const noBottomMargin = !route.shouldShowAppBar || match
  const handleClose = () => {
    localStorage.setItem(HALLOWEEN_MODAL_WAS_SHOWN, 'true')
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
        <BatIcon className={classes.svg} />
        <Typography className={classes.title}>Буу-у-у!</Typography>
        <Typography className={classes.text}>
          Найди специальную тему в настройках
        </Typography>
      </div>
    </div>
  )
}

export default HalloweenNotification
