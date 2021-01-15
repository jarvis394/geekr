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
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    position: 'fixed',
    willChange: 'transform',
    flexGrow: 1,
    transform: ({ isShrinked }: StyleProps) =>
      `translateZ(0) translateY(${isShrinked ? -16 : 0}px)`,
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
    color: theme.palette.text.primary,
    fontSize: 20,
    letterHeight: '1.6',
    marginTop: 2,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    zIndex: 1000,
    textOverflow: 'ellipsis',
  },
  headerIcon: {
    marginRight: theme.spacing(0.5),
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
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    transform: 'translateZ(0)',
    height: 49,
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
  shrinkedHeaderTitle: {
    fontFamily: 'Google Sans',
    fontWeight: 500,
    color: theme.palette.text.secondary,
    fontSize: 16,
    transform: 'translateX(16px) translateY(8px)',
    letterHeight: '1.6',
    marginTop: 2,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    zIndex: 1000,
    position: 'absolute',
    textOverflow: 'ellipsis',
  },
}))

interface Props {
  children?: unknown
  headerText?: unknown
  hidePositionBar?: boolean
}

const ShrinkedContent = ({ isShrinked, headerText }) => {
  const classes = useAppBarStyles({ isShrinked, scrollProgress: 0 })
  return (
    <Fade in={isShrinked} unmountOnExit mountOnEnter>
      <Typography className={classes.shrinkedHeaderTitle}>
        {headerText}
      </Typography>
    </Fade>
  )
}
const UnshrinkedContent = ({ isShrinked, headerText }) => {
  const classes = useAppBarStyles({ isShrinked, scrollProgress: 0 })
  const history = useHistory()
  return (
    <Fade in={!isShrinked} unmountOnExit mountOnEnter>
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
    </Fade>
  )
}

const NavBar = ({ headerText, hidePositionBar = false }) => {
  const isShrinked = useScrollTrigger({
    threshold: 48,
  })
  const [scrollProgress, setScrollProgress] = useState(
    Math.min(window.pageYOffset / 48, 1)
  )
  const classes = useAppBarStyles({ isShrinked, scrollProgress })

  useEffect(() => {
    const scrollCallback = () => {
      const position = window.pageYOffset
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight
      const newScrollProgress = Math.min(
        position / (windowHeight - (isMobile() ? chromeAddressBarHeight : 0)),
        1
      )
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
            <UnshrinkedContent
              isShrinked={isShrinked}
              headerText={headerText}
            />
            <ShrinkedContent isShrinked={isShrinked} headerText={headerText} />
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
