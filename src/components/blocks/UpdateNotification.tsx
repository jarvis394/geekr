import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  ButtonBase,
  fade,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded'
import {
  BOTTOM_BAR_HEIGHT,
  MIDDLE_WIDTH,
  MIN_WIDTH,
  NEEDS_UPDATE_KEY,
} from 'src/config/constants'
import { useRoute } from 'src/hooks'
import { useSnackbar } from 'notistack'

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
    bottom: 0,
    width: `calc(100% - ${theme.spacing(2) * 2}px)`,
    transitionDuration: '0.1s',
    transitionTimingFunction: theme.transitions.easing.easeOut,
    pointerEvents: 'none',
  },
  root: {
    pointerEvents: 'auto',
    backgroundColor: theme.palette.primary.dark,
    borderRadius: 8,
    marginBottom: 0,
    padding: theme.spacing(1.5, 2),
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    textAlign: 'initial',
    maxWidth: 520,
    boxShadow:
      '0px 3px 5px -1px rgb(0 0 0 / 10%), 0px 6px 10px 0px rgb(0 0 0 / 4%), 0px 1px 18px 0px rgb(0 0 0 / 2%)',
  },
  title: {
    color: theme.palette.getContrastText(theme.palette.primary.dark),
    fontWeight: 700,
    fontSize: 17,
    fontFamily: 'Google Sans',
  },
  subtitle: {
    fontWeight: 500,
    fontFamily: 'Google Sans',
    fontSize: 14,
    color: fade(
      theme.palette.getContrastText(theme.palette.primary.dark),
      0.75
    ),
  },
  text: {
    flexDirection: 'column',
    flexGrow: 1,
  },
  icon: {
    color: theme.palette.getContrastText(theme.palette.primary.dark),
    marginLeft: theme.spacing(2),
  },
}))

const UpdateNotification = () => {
  const initialShouldShow = localStorage.getItem(NEEDS_UPDATE_KEY) === 'true'
  const [isShown, setIsShown] = useState(initialShouldShow)
  const classes = useStyles()
  const theme = useTheme()
  const route = useRoute()
  const match = useMediaQuery(theme.breakpoints.up(MIDDLE_WIDTH), {
    noSsr: true,
  })
  const noBottomMargin = !route.shouldShowAppBar || match
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    const receiveMessage = (event: MessageEvent<string>) => {
      if (event.origin === process.env.PUBLIC_URL) {
        if (event.data === 'showUpdateNotification') {
          setIsShown(true)
        } else if (event.data === 'showUpdateSuccessNotification') {
          enqueueSnackbar('Приложение было обновлено', {
            variant: 'info',
            autoHideDuration: 3000,
          })
        }
      }
    }
    window.addEventListener('message', receiveMessage)
    return () => window.removeEventListener('message', receiveMessage)
  })

  const onClick = () => {
    window.location.reload()
    localStorage.setItem(NEEDS_UPDATE_KEY, 'false')
  }

  return isShown ? (
    <div
      className={classes.rootWrapper}
      style={{
        transform: `translateY(calc(${
          noBottomMargin ? 0 : -1 * BOTTOM_BAR_HEIGHT
        }px + env(safe-area-inset-bottom, 0px)))`,
      }}
    >
      <ButtonBase className={classes.root} onClick={onClick}>
        <div className={classes.text}>
          <Typography className={classes.title}>Доступно обновление</Typography>
          <Typography className={classes.subtitle}>
            Обновите страницу или нажмите на сообщение, чтобы изменения вступили
            в силу
          </Typography>
        </div>
        <RefreshRoundedIcon className={classes.icon} />
      </ButtonBase>
    </div>
  ) : null
}

export default UpdateNotification
