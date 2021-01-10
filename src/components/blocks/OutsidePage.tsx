import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
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
    zIndex: 1100,
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
    marginRight: 'auto',
    marginLeft: 'auto',
  },
}))

const useAppBarStyles = makeStyles((theme) => ({
  header: {
    // backgroundColor: ({ isShrinked }: StyleProps) =>
    //   theme.palette.background[isShrinked ? 'paper' : 'default'],
    backgroundColor: theme.palette.background.default,
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
    fontSize: 20,
    transform: ({ isShrinked }: StyleProps) =>
      `translateX(${isShrinked ? 16 : 52}px) scale(${isShrinked ? 0.8 : 1})`,
    transformOrigin: 'left',
    letterHeight: '1.6',
    marginTop: 2,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    // maxWidth: ({ isShrinked }: StyleProps) =>
    //   `calc(100% - ${isShrinked ? 0 : 16 + 4 + 48}px + ${isShrinked ? 56 + 32 : 0}px)`,
    zIndex: 1000,
    transition: 'all .3s cubic-bezier(0.4, 0, 0.2, 1) 5ms !important',
  },
  headerIcon: {
    marginRight: theme.spacing(0.5),
    transition: 'all .3s cubic-bezier(0.4, 0, 0.2, 1) 5ms !important',
    transform: ({ isShrinked }: StyleProps) =>
      'translateX(' + (isShrinked ? -36 : 0) + 'px)',
  },
  marginContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    '&::before': {
      position: 'absolute',
      width: ({ scrollProgress }: StyleProps) => scrollProgress * 100 + '%',
      background:
        theme.palette.type === 'dark'
          ? 'rgba(255, 255, 255, .1)'
          : 'rgba(0, 0, 0, .1)',
      height: '100%',
      content: '""',
    },
  },
  content: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    transform: 'translateZ(0)',
    height: '100%',
    maxHeight: ({ isShrinked }: StyleProps) => (isShrinked ? 33 : 49),
    transition: 'all .3s cubic-bezier(0.4, 0, 0.2, 1) 5ms',
  },
  dividerHolder: {
    display: 'flex',
    justifyContent: 'center',
    zIndex: 1,
  },
  divider: {
    width: ({ isShrinked }: StyleProps) =>
      isShrinked ? '100%' : 'calc(100% - 32px)',
    transition: 'all .3s cubic-bezier(0.4, 0, 0.2, 1) 5ms',
  },
  // shadow: {
  //   position: 'absolute',
  //   width: 32,
  //   right: 0,
  //   background: `linear-gradient(to right, transparent, ${theme.palette.background.default})`,
  //   height: '100%',
  //   zIndex: -1,
  //   '&::after': {
  //     position: 'absolute',
  //     width: 48,
  //     right: 0,
  //     background: `linear-gradient(to right, transparent, ${theme.palette.background.paper})`,
  //     height: '100%',
  //     content: '""',
  //     transition: 'all .3s cubic-bezier(0.4, 0, 0.2, 1) 5ms',
  //     opacity: ({ isShrinked }: StyleProps) => isShrinked ? 1 : 0
  //   }
  // }
}))

interface Props {
  children?: unknown
  headerText?: unknown
  hidePositionBar?: boolean
}

const NavBar = ({ headerText, hidePositionBar = false }) => {
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
    const scrollCallbackFn = scrollCallback.bind(this)

    if (!hidePositionBar) {
      window.addEventListener('scroll', scrollCallbackFn)
      return () => window.removeEventListener('scroll', scrollCallbackFn)
    } else return () => null
  }, [hidePositionBar])

  return (
    <AppBar className={classes.header} elevation={0}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.marginContainer}>
          <div className={classes.content}>
            <Fade in={!isShrinked}>
              <IconButton
                disableRipple={isShrinked}
                className={classes.headerIcon}
                onClick={() => (isShrinked ? {} : history.goBack())}
              >
                <BackRoundedIcon />
              </IconButton>
            </Fade>
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
  const { headerText, hidePositionBar } = props

  return (
    <div className={classes.root}>
      <NavBar headerText={headerText} hidePositionBar={hidePositionBar} />
      <div className={classes.children}>{children}</div>
    </div>
  )
}

export default OutsidePage
