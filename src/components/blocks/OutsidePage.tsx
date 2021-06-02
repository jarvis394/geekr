import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Divider,
  Fade,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core'
import BackRoundedIcon from '@material-ui/icons/ArrowBackRounded'
import { useHistory, useLocation } from 'react-router'
import { APP_BAR_HEIGHT, MIN_WIDTH } from 'src/config/constants'
import isMobile from 'is-mobile'
import { chromeAddressBarHeight } from 'src/config/constants'
import { useScrollTrigger } from 'src/hooks'
import getContrastPaperColor from 'src/utils/getContrastPaperColor'
import getInvertedContrastPaperColor from 'src/utils/getInvertedContrastPaperColor'
import useMediaExtendedQuery from 'src/hooks/useMediaExtendedQuery'
import getCachedMode from 'src/utils/getCachedMode'

interface StyleProps {
  isShrinked?: boolean
  scrollProgress?: number
  backgroundColor?: string
  shrinkedBackgroundColor?: string
  disableShrinking?: boolean
}

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    minHeight: '100%',
    width: '100%',
  },
  children: {
    maxWidth: MIN_WIDTH,
    display: 'flex',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
}))

const useAppBarStyles = makeStyles((theme) => ({
  toolbarIcons: {
    marginRight: theme.spacing(2),
    display: 'flex',
  },
  header: {
    backgroundColor: ({
      isShrinked,
      backgroundColor,
      shrinkedBackgroundColor,
    }: StyleProps) =>
      isShrinked
        ? backgroundColor || getInvertedContrastPaperColor(theme)
        : shrinkedBackgroundColor || getContrastPaperColor(theme),
    color: theme.palette.text.primary,
    position: 'fixed',
    willChange: 'transform',
    flexGrow: 1,
    transform: ({ isShrinked }: StyleProps) =>
      `translateZ(0) translateY(${isShrinked ? -16 : 0}px)`,
    transition: ({ disableShrinking }: StyleProps) =>
      disableShrinking ? 'none' : 'all .3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&::before': {
      position: 'absolute',
      width: ({ scrollProgress }: StyleProps) => scrollProgress * 100 + '%',
      background:
        theme.palette.type === 'dark'
          ? 'rgba(255, 255, 255, .1)'
          : 'rgba(0, 0, 0, .1)',
      height: '100%',
      content: '""',
      transform: 'translateZ(0)',
    },
    [theme.breakpoints.up(MIN_WIDTH)]: {
      backgroundColor: theme.palette.background.paper + ' !important',
    },
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
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    zIndex: 1000,
    textOverflow: 'ellipsis',
    marginRight: theme.spacing(2),
  },
  headerIcon: {
    marginLeft: 4,
    color: theme.palette.text.primary,
  },
  marginContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    transform: 'translateZ(0)',
    height: APP_BAR_HEIGHT + 1,
    flexGrow: 1,
  },
  dividerHolder: {
    display: 'flex',
    justifyContent: 'center',
    zIndex: 1,
    [theme.breakpoints.up(MIN_WIDTH)]: {
      display: 'none',
    },
  },
  divider: {
    width: ({ isShrinked }: StyleProps) =>
      isShrinked ? '100%' : 'calc(100% - 32px)',
    transition: 'all .3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  dividerHolderFullWidth: {
    display: 'none',
    justifyContent: 'center',
    zIndex: 1,
    [theme.breakpoints.up(MIN_WIDTH)]: {
      display: 'flex',
    },
  },
  dividerFullWidth: {
    width: '100%',
  },
  shrinkedHeaderTitle: {
    fontFamily: 'Google Sans',
    fontWeight: 500,
    color: theme.palette.text.secondary,
    fontSize: 16,
    transform: 'translateX(16px) translateY(8px)',
    letterHeight: '1.6',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    zIndex: 1000,
    maxWidth: 'calc(100% - 32px)',
    position: 'absolute',
    textOverflow: 'ellipsis',
  },
}))

interface Props {
  children: unknown
  headerText: unknown
  hidePositionBar: boolean
  shrinkedHeaderText: unknown
  shrinkedBackgroundColor: string
  disableShrinking: boolean
  backgroundColor: string
  toolbarIcons: JSX.Element
  onBackClick: (backLinkFunction: () => void) => unknown
}

const ShrinkedContent = ({ isShrinked, shrinkedHeaderText }) => {
  const classes = useAppBarStyles({})
  return (
    <Fade in={isShrinked} unmountOnExit mountOnEnter>
      <Typography className={classes.shrinkedHeaderTitle}>
        {shrinkedHeaderText}
      </Typography>
    </Fade>
  )
}

const UnshrinkedContent = ({
  headerText,
  onBackClick,
  isShrinked,
  headerTextUpdated,
}) => {
  const classes = useAppBarStyles({})
  const history = useHistory()
  const text = (
    <Typography className={classes.headerTitle}>{headerText}</Typography>
  )
  const goHome = () => history.push(getCachedMode().to + '/p/1')
  const backLinkFunction = () => {
    if (history.length > 1) {
      history.goBack()
    } else goHome()
  } 

  const onClick = () => {
    if (onBackClick) onBackClick(backLinkFunction)
    else backLinkFunction()
  }

  return (
    <Fade in={!isShrinked} appear={false}>
      <div className={classes.content} style={{ overflow: 'hidden' }}>
        <IconButton
          disableRipple={isShrinked}
          className={classes.headerIcon}
          onClick={() => (isShrinked ? {} : onClick())}
        >
          <BackRoundedIcon />
        </IconButton>
        {headerText && headerTextUpdated ? <Fade in>{text}</Fade> : text}
      </div>
    </Fade>
  )
}

const ToolbarIconsWrapper = ({ isShrinked, children }) => {
  const classes = useAppBarStyles({})
  return (
    <Fade in={!isShrinked}>
      <div className={classes.toolbarIcons}>{children}</div>
    </Fade>
  )
}

const NavBarUnmemoized = ({
  headerText,
  shrinkedHeaderText,
  hidePositionBar = false,
  shrinkedBackgroundColor,
  backgroundColor,
  onBackClick,
  disableShrinking,
  toolbarIcons,
}: Partial<Props>) => {
  const isShrinkedTrigger = useScrollTrigger({
    threshold: 48,
    triggerValue: false,
  })
  const [headerTextUpdated, setHeaderTextUpdated] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const isExtended = useMediaExtendedQuery()
  const isShrinked = disableShrinking || isExtended ? false : isShrinkedTrigger
  const classes = useAppBarStyles({
    isShrinked,
    scrollProgress,
    backgroundColor,
    shrinkedBackgroundColor,
    disableShrinking,
  })
  const scrollCallback = () =>
    requestAnimationFrame(() => {
      const position = window.pageYOffset
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight
      const newScrollProgress = Math.min(
        position / (windowHeight - (isMobile() ? chromeAddressBarHeight : 0)),
        1
      )
      setScrollProgress(newScrollProgress)
    })

  useEffect(() => {
    if (!hidePositionBar && !disableShrinking) {
      window.addEventListener('scroll', scrollCallback)
      return () => window.removeEventListener('scroll', scrollCallback)
    } else return () => null
  }, [hidePositionBar, disableShrinking])

  // Remove fade effect on a title if it was set by default
  // If the title is being fetched (ex. Post),
  // we need to change the state and render Fade component
  useEffect(() => {
    !headerTextUpdated && setHeaderTextUpdated(!headerText)
  }, [headerText])

  return (
    <AppBar className={classes.header} elevation={0}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.marginContainer}>
          <div className={classes.content}>
            <UnshrinkedContent
              isShrinked={isShrinked}
              headerText={headerText}
              onBackClick={onBackClick}
              headerTextUpdated={headerTextUpdated}
            />
            <ShrinkedContent
              isShrinked={isShrinked}
              shrinkedHeaderText={shrinkedHeaderText || headerText}
            />
            <ToolbarIconsWrapper isShrinked={isShrinked}>
              {toolbarIcons}
            </ToolbarIconsWrapper>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  )
}
const NavBar = React.memo(NavBarUnmemoized)

const OutsidePage = ({ children, ...props }: Partial<Props>) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <NavBar {...props} />
      <div className={classes.children}>{children}</div>
    </div>
  )
}

export default React.memo(OutsidePage)
