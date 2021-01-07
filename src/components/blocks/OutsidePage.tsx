import React, { useEffect, useState } from 'react'
import { darken, lighten, makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Divider,
  Fade,
  IconButton,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@material-ui/core'
import BackRoundedIcon from '@material-ui/icons/ArrowBackRounded'
import { useHistory } from 'react-router'
import { MIN_WIDTH } from 'src/config/constants'
import isMobile from 'is-mobile'
import { chromeAddressBarHeight } from 'src/config/constants'

interface StyleProps {
  isShrinked: boolean
  scrollProgress: number
}

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    zIndex: 2000,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    minHeight: '100%',
  },
  children: {
    marginTop: 49,
    maxWidth: MIN_WIDTH,
    display: 'flex',
    flexDirection: 'column',
  },
}))

const useAppBarStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: ({ isShrinked }: StyleProps) =>
      theme.palette.background[isShrinked ? 'paper' : 'default'],
    color: theme.palette.text.primary,
    position: 'fixed',
    willChange: 'transform',
    flexGrow: 1,
    transition: 'all .3s cubic-bezier(0.4, 0, 0.2, 1) 5ms',
  },
  toolbar: {
    margin: 'auto',
    minHeight: 'unset',
    padding: 0,
    maxWidth: MIN_WIDTH,
    width: '100%',
  },
  headerTitle: {
    fontFamily: 'Google Sans',
    fontWeight: 500,
    position: 'absolute',
    color: ({ isShrinked }: StyleProps) =>
      theme.palette.text[isShrinked ? 'secondary' : 'primary'],
    fontSize: ({ isShrinked }: StyleProps) => (isShrinked ? 16 : 20),
    left: ({ isShrinked }: StyleProps) => (isShrinked ? 16 : 52),
    letterHeight: '1.6',
    marginTop: 2,
    whiteSpace: 'nowrap',
    willChange: 'transform',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: ({ isShrinked }: StyleProps) =>
      `calc(100% - ${isShrinked ? 32 : 32 + 48}px)`,
    zIndex: 1000,
    transition: 'all .3s cubic-bezier(0.4, 0, 0.2, 1) 5ms !important',
  },
  headerIcon: {
    marginRight: theme.spacing(0.5),
    transition: 'margin-left .3s cubic-bezier(0.4, 0, 0.2, 1) 5ms',
    willChange: 'transform',
    marginLeft: ({ isShrinked }: StyleProps) => (isShrinked ? -36 : 0),
  },
  marginContainer: {
    display: 'flex',
    willChange: 'transform',
    width: '100%',
    flexDirection: 'column',
    '&::before': {
      position: 'absolute',
      willChange: 'transform',
      width: ({ scrollProgress }: StyleProps) => scrollProgress * 100 + '%',
      background:
        theme.palette.type === 'dark'
          ? lighten(theme.palette.background.paper, 0.05)
          : darken(theme.palette.background.paper, 0.05),
      height: '100%',
      content: '""',
    },
  },
  content: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    willChange: 'transform',
    height: ({ isShrinked }: StyleProps) => (isShrinked ? 33 : 49),
    transition: 'height .3s cubic-bezier(0.4, 0, 0.2, 1) 5ms',
  },
  dividerHolder: {
    display: 'flex',
    justifyContent: 'center',
    zIndex: 1,
  },
  divider: {
    width: ({ isShrinked }: StyleProps) =>
      isShrinked ? '100%' : 'calc(100% - 32px)',
    willChange: 'transform',
    transition: 'width .3s cubic-bezier(0.4, 0, 0.2, 1) 5ms',
  },
}))

interface Props {
  children?: unknown
  headerText?: unknown
}

const NavBar = ({ headerText }) => {
  const isShrinked = useScrollTrigger({
    threshold: 48,
  })
  const [scrollProgress, setScrollProgress] = useState(
    Math.round(Math.min(window.pageYOffset / 48, 1) * 10000) / 10000
  )
  const classes = useAppBarStyles({ isShrinked, scrollProgress })
  const history = useHistory()

  useEffect(() => {
    const scrollCallback = () => {
      const position = window.pageYOffset
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight
      const newScrollProgress =
        Math.round(
          Math.min(
            position /
              (windowHeight - (isMobile() ? chromeAddressBarHeight : 0)),
            1
          ) * 10000
        ) / 10000
      setScrollProgress(newScrollProgress)
    }

    window.addEventListener('scroll', () => scrollCallback())
    return () => window.removeEventListener('scroll', scrollCallback)
  }, [])

  return (
    <AppBar className={classes.header} elevation={0}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.marginContainer}>
          <div className={classes.content}>
            <IconButton
              disableRipple={isShrinked}
              className={classes.headerIcon}
              onClick={() => (isShrinked ? {} : history.goBack())}
            >
              <BackRoundedIcon />
            </IconButton>
            {headerText && (
              <Fade in>
                <Typography className={classes.headerTitle}>
                  {headerText}
                </Typography>
              </Fade>
            )}
          </div>
          <div className={classes.dividerHolder}>
            <Divider className={classes.divider} />
          </div>
        </div>
      </Toolbar>
    </AppBar>
  )
}

const OutsidePage = ({ children, ...props }: Props) => {
  const classes = useStyles()
  const { headerText } = props

  return (
    <div className={classes.root}>
      <NavBar headerText={headerText} />
      <div className={classes.children}>{children}</div>
    </div>
  )
}

export default OutsidePage
