import React from 'react'
import { Comment as CommentData } from 'src/interfaces'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import FormattedText from 'src/components/formatters/FormattedText'
import UserAvatar from 'src/components/blocks/UserAvatar'
import LinkToOutsidePage from 'src/components/blocks/LinkToOutsidePage'
import {
  Button,
  fade,
  IconButton,
  Fade,
  Typography,
  useMediaQuery,
} from '@material-ui/core'
import dayjs from 'dayjs'
import { lightGreen } from '@material-ui/core/colors'
import { MIN_WIDTH } from 'src/config/constants'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import GreenRedNumber from 'src/components/formatters/GreenRedNumber'
import {
  LazyLoadComponent,
  ScrollPosition,
} from 'react-lazy-load-image-component'
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded'
import { Icon16Up, Icon16Down } from '@vkontakte/icons'
import { useSelector } from 'src/hooks'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    '-webkit-tap-highlight-color': 'transparent !important',
    textDecoration: 'none',
    color: theme.palette.text.primary,
    background: theme.palette.background.paper,
    paddingTop: theme.spacing(2),
  },
  ufo: {},
  ufoMessage: {
    color: theme.palette.text.secondary,
  },
  ufoDepthLinesHolder: {
    position: 'relative',
  },
  firstInThread: {
    [theme.breakpoints.up(MIN_WIDTH)]: {
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
  },
  bottomPadding: {
    paddingBottom: theme.spacing(2) + 'px !important',
  },
  lastInThread: {
    [theme.breakpoints.up(MIN_WIDTH)]: {
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
    },
    paddingBottom: theme.spacing(1.5) + 'px !important',
  },
  fade: {
    transitionDuration: '0.5s',
  },
  wrapper: {
    '&:hover': {
      opacity: '1 !important',
    },
    transitionDuration: '0.1s',
  },
  authorBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    margin: -4,
    borderRadius: 2,
    height: 24,
    '&:focus': {
      outline: '1px solid ' + fade(theme.palette.primary.main, 0.75),
    },
    [theme.breakpoints.up(MIN_WIDTH)]: {
      height: 28,
    },
  },
  authorBarOP: {
    background: fade(lightGreen[400], 0.2),
    '&:focus': {
      outline: '1px solid ' + fade(lightGreen[400], 0.75),
    },
  },
  authorBarLink: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    textDecoration: 'none',
    marginRight: theme.spacing(1),
  },
  bottomBar: {
    marginTop: theme.spacing(0.5),
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up(MIN_WIDTH)]: {
      marginTop: theme.spacing(1),
    },
  },
  depthLine: {
    position: 'absolute',
    borderLeft: '1px solid ' + fade(theme.palette.divider, 0.05),
  },
  avatar: {
    width: 24,
    height: 24,
    marginRight: theme.spacing(1),
    borderRadius: 2,
    [theme.breakpoints.up(MIN_WIDTH)]: {
      width: 28,
      height: 28,
    },
  },
  grayIcon: {
    color: fade(theme.palette.text.hint, 0.2),
    padding: 3,
  },
  message: {
    marginTop: theme.spacing(1),
    [theme.breakpoints.up(MIN_WIDTH)]: {
      marginTop: theme.spacing(1.5),
      lineHeight: '24px !important',
      fontSize: '16px !important',
    },
    lineHeight: '22px',
    fontSize: '15px !important',
    wordBreak: 'break-word',
    hyphens: 'auto',
    '& p': {
      margin: 0,
      fontSize: '15px !important',
      [theme.breakpoints.up(MIN_WIDTH)]: {
        fontSize: '16px !important',
      },
    },
  },
  authorAndTS: {
    display: 'flex',
    flexDirection: 'column',
  },
  authorAlias: {
    color:
      theme.palette.type === 'light'
        ? theme.palette.primary.light
        : theme.palette.primary.dark,
    fontWeight: 800,
    textDecoration: 'none',
    fontSize: 13,
    lineHeight: '15px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    flex: 1,
    [theme.breakpoints.up(MIN_WIDTH)]: {
      fontSize: 14,
      lineHeight: '16px',
    },
  },
  ts: {
    color: theme.palette.text.hint,
    fontSize: 10,
    lineHeight: '11px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    [theme.breakpoints.up(MIN_WIDTH)]: {
      fontSize: 11,
      lineHeight: '12px',
    },
  },
  moreIcon: {
    width: 32,
    height: 32,
    color: theme.palette.text.secondary,
  },
  flexGrow: {
    flexGrow: 1,
    display: 'flex',
  },
  greenRedNumber: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.hint,
    margin: theme.spacing(0, 1),
  },
  score: {
    position: 'relative',
    fontWeight: 700,
    fontSize: 13,
  },
  replyButton: {
    borderRadius: 16,
    backgroundColor: 'transparent',
    textTransform: 'none',
    padding: theme.spacing(0.5, 1.5),
    color: theme.palette.text.secondary,
    fontFamily: 'Google Sans',
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  favoriteButton: {
    borderRadius: '50%',
    minWidth: 28,
    padding: 5,
  },
  favoriteIcon: {
    fontSize: 20,
    color: fade(theme.palette.primary.main, 0.2),
  },
  placeholder: {
    height: 128,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
  },
  goToThreadButton: {
    textTransform: 'none',
    padding: theme.spacing(0.5, 1.5),
    fontFamily: 'Google Sans',
    marginLeft: theme.spacing(1),
  },
  goToThreadWrapper: {
    position: 'relative',
    marginTop: theme.spacing(1),
  },
  goToThreadLink: {
    textDecoration: 'none',
  },
}))

const getOpacity = (value: number) => {
  const v = Math.abs(value)
  const r = Math.min(v / 10 + 0.1, 0.5)
  return 1 - r
}

const Comment: React.FC<{
  data: CommentData
  isLastInFilteredRootThread: boolean
  scrollPosition: ScrollPosition
  postId: string
}> = ({ data, isLastInFilteredRootThread, scrollPosition, postId }) => {
  const isRootComment = data.level === 0
  const { id, isLastInThread, isPostAuthor, isThreadStart } = data
  const theme = useTheme()
  const classes = useStyles()
  const shouldShowThreadButtonSetting = useSelector(store => store.settings.interfaceComments.showThreads)
  const ts = dayjs(data.timePublished).format('DD.MM.YYYY [в] H:mm')
  const rootClasses = [classes.root]
  const authorBarClasses = [classes.authorBar]
  const isTablet = useMediaQuery(theme.breakpoints.up(MIN_WIDTH), {
    noSsr: true,
  })
  const shouldShowThreadButton = shouldShowThreadButtonSetting && isThreadStart
  const MARGIN_LEVEL = isTablet ? 24 : 16
  const commentPadding = data.level * MARGIN_LEVEL
  const commentOpacity = data.score < 0 ? getOpacity(data.score) : 1
  const shouldAddBottomPadding = isLastInFilteredRootThread

  isRootComment && rootClasses.push(classes.firstInThread)
  isLastInThread && rootClasses.push(classes.lastInThread)
  shouldAddBottomPadding && rootClasses.push(classes.bottomPadding)
  isPostAuthor && authorBarClasses.push(classes.authorBarOP)

  const GoToThreadButton = () => shouldShowThreadButton ? (
    <div className={classes.goToThreadWrapper}>
      <div
        className={classes.depthLine}
        style={{
          top: 0,
          bottom: 0,
        }}
      />
      <LinkToOutsidePage
        className={classes.goToThreadLink}
        to={'/post/' + postId + '/comments/thread/' + id}
      >
        <Button
          color="primary"
          className={classes.goToThreadButton}
          endIcon={<ChevronRightRoundedIcon />}
        >
          Показать ветку
        </Button>
      </LinkToOutsidePage>
    </div>
  ) : null

  if (!data.author) {
    return (
      <LazyLoadComponent
        scrollPosition={scrollPosition}
        placeholder={
          <div style={{ height: 64 }} className={classes.placeholder} />
        }
      >
        <div className={rootClasses.join(' ')}>
          {[...Array(data.level)].map((_, i) => {
            return (
              <div
                key={i}
                className={classes.depthLine}
                style={{
                  left: MARGIN_LEVEL * (i + 1),
                  top:
                    data.isNewLevel && data.level === i + 1
                      ? theme.spacing(0.75)
                      : 0,
                  bottom: isLastInThread ? theme.spacing(1) : 0,
                }}
              />
            )
          })}
          <Fade in>
            <div
              style={{ paddingLeft: commentPadding + MARGIN_LEVEL }}
              className={[classes.ufo, classes.fade].join(' ')}
            >
              <FormattedText
                className={[classes.ufoMessage, classes.message].join(' ')}
              >
                {data.message}
              </FormattedText>
              <GoToThreadButton />
            </div>
          </Fade>
        </div>
      </LazyLoadComponent>
    )
  }

  return (
    <LazyLoadComponent
      scrollPosition={scrollPosition}
      placeholder={
        <div
          style={{ marginTop: isRootComment ? theme.spacing(1.5) : 0 }}
          className={classes.placeholder}
        />
      }
    >
      <div
        className={rootClasses.join(' ')}
        style={{
          paddingLeft: theme.spacing(MARGIN_LEVEL / theme.spacing(1)),
          paddingRight: theme.spacing(MARGIN_LEVEL / theme.spacing(1)),
          marginTop: isRootComment ? theme.spacing(1.5) : 0,
        }}
      >
        {[...Array(data.level)].map((_, i) => {
          let bottom = isLastInThread ? theme.spacing(1.2) : 0
          if (shouldAddBottomPadding) bottom += theme.spacing(1)
          return (
            <div
              key={i}
              className={classes.depthLine}
              style={{
                left: MARGIN_LEVEL * (i + 1),
                top:
                  data.isNewLevel && data.level === i + 1
                    ? theme.spacing(1.5)
                    : 0,
                bottom,
              }}
            />
          )
        })}
        <Fade in>
          <div className={classes.fade}>
            <div
              className={classes.wrapper}
              style={{ paddingLeft: commentPadding, opacity: commentOpacity }}
            >
              <div className={authorBarClasses.join(' ')}>
                <div className={classes.flexGrow}>
                  <LinkToOutsidePage
                    className={classes.authorBarLink}
                    to={'/user/' + data.author.alias}
                  >
                    <UserAvatar
                      src={data.author.avatarUrl}
                      alias={data.author.alias}
                      className={classes.avatar}
                    />
                    <div className={classes.authorAndTS}>
                      <Typography className={classes.authorAlias}>
                        {data.author.alias}
                      </Typography>
                      <Typography className={classes.ts} variant="caption">
                        {ts}
                      </Typography>
                    </div>
                  </LinkToOutsidePage>
                </div>
                <IconButton className={classes.moreIcon}>
                  <MoreHorizIcon />
                </IconButton>
              </div>
              <FormattedText className={classes.message}>
                {data.message}
              </FormattedText>
              <div className={classes.bottomBar}>
                <IconButton className={classes.grayIcon}>
                  <Icon16Up width={24} height={24} />
                </IconButton>
                <GreenRedNumber
                  number={data.score}
                  wrapperProps={{ className: classes.greenRedNumber }}
                >
                  <Typography className={classes.score}>
                    {data.score > 0 ? '+' : ''}
                    {data.score}
                  </Typography>
                </GreenRedNumber>
                <IconButton className={classes.grayIcon}>
                  <Icon16Down width={24} height={24} />
                </IconButton>
                <div className={classes.flexGrow}>
                  <Button size="small" className={classes.replyButton}>
                    Ответить
                  </Button>
                </div>
                <Button
                  size="small"
                  color="primary"
                  className={classes.favoriteButton}
                >
                  <BookmarkIcon className={classes.favoriteIcon} />
                </Button>
              </div>
              <GoToThreadButton />
            </div>
          </div>
        </Fade>
      </div>
    </LazyLoadComponent>
  )
}

export default Comment
