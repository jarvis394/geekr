import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { MIDDLE_WIDTH, MIN_WIDTH } from 'src/config/constants'
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import VisibilityIcon from '@material-ui/icons/Visibility'
import CommentsIcon from '@material-ui/icons/CommentRounded'
import ThumbDownAltRoundedIcon from '@material-ui/icons/ThumbDownAltRounded'
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded'
import { Icon28ShareOutline as ShareIcon } from '@vkontakte/icons'
import formatNumber from 'src/utils/formatNumber'
import { FetchingState, Post } from 'src/interfaces'
import {
  Button,
  ButtonBase,
  CircularProgress,
  Fade,
  fade,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Theme,
  Tooltip,
  Typography,
  useTheme,
} from '@material-ui/core'
import { useHistory, useLocation } from 'react-router'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import BottomDrawer from 'src/components/blocks/BottomDrawer'
import { Icon24ChevronCompactRight } from '@vkontakte/icons'
import GreenRedNumber from 'src/components/formatters/GreenRedNumber'
import { Icon16Up, Icon16Down } from '@vkontakte/icons'
import { Link } from 'react-router-dom'
import getPostLink from 'src/utils/getPostLink'
import getFavoritesCount from 'src/utils/getFavoritesCount'
import { useSelector } from 'src/hooks'
import setArticleBookmark from 'src/api/setArticleBookmark'
import setArticleVote from 'src/api/setArticleVote'
import APIError from 'src/interfaces/APIError'
import getScoreTotal from 'src/utils/getScoreTotal'

const getScoreColor = (score: number, theme: Theme) => {
  if (score === 0) return theme.palette.background.paper
  else if (score > 0) return theme.palette.success.main
  else if (score < 0) return theme.palette.error.main
}

const SEPARATE_COMMENTS_BUTTON_WIDTH = 1416
const MIN_COMMENTS_BUTTON_WIDTH = 1132
const useDesktopStyles = makeStyles((theme) => ({
  root: {
    display: 'none',
    marginTop: theme.spacing(2),
    flexDirection: 'row',
    gap: theme.spacing(2),
    [theme.breakpoints.between(MIN_WIDTH, SEPARATE_COMMENTS_BUTTON_WIDTH)]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.between(MIN_COMMENTS_BUTTON_WIDTH, MIDDLE_WIDTH)]: {
      flexDirection: 'row',
    },
    [theme.breakpoints.up(MIN_WIDTH)]: {
      display: 'flex',
    },
  },
  scoreWrapper: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.secondary,
  },
  grayIcon: {
    color: theme.palette.text.secondary,
    padding: 12,
  },
  scoreUpActive: {
    color: theme.palette.success.main + ' !important',
    padding: 12,
  },
  scoreDownActive: {
    color: theme.palette.error.main + ' !important',
    padding: 12,
  },
  shareButton: {
    width: '100%',
    borderRadius: 8,
    height: 48,
    color: theme.palette.text.secondary,
    textTransform: 'none',
    fontSize: 16,
    fontFamily: 'Google Sans',
  },
  card: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 8,
    padding: theme.spacing(0, 2),
    display: 'flex',
    gap: theme.spacing(1),
    height: 48,
  },
  section: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  commentsCard: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 8,
    padding: theme.spacing(0, 2),
    fontSize: 16,
    fontFamily: 'Google Sans',
    fontWeight: 500,
    alignItems: 'center',
    display: 'flex',
    height: 48,
    width: '100%',
  },
  commentsChevronRightIcon: {
    marginLeft: theme.spacing(1.5),
  },
  commentsCardLink: {
    display: 'flex',
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
  commentsAmount: {
    marginLeft: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  score: {
    fontSize: 16,
    fontWeight: 600,
    fontFamily: 'Google Sans',
  },
  spinner: {
    width: '24px !important',
    height: '24px !important',
  },
}))

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.primary,
    position: 'relative',
    display: 'flex',
    zIndex: 5,
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0, 2),
    [theme.breakpoints.up(MIN_WIDTH)]: {
      display: 'none',
    },
  },
  title: {
    textAlign: 'left',
    fontFamily: 'Google Sans',
    textTransform: 'uppercase',
    fontWeight: 500,
    fontSize: 13,
    letterSpacing: '1px',
    color: theme.palette.text.hint,
    lineHeight: 'normal',
    padding: theme.spacing(1.8, 0),
  },
  shareButton: {
    width: '100%',
    borderRadius: 8,
    height: 48,
    marginTop: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  confirmDownvoteButton: {
    height: 40,
    marginTop: theme.spacing(2),
    borderRadius: 8,
    textTransform: 'none',
    fontFamily: 'Google Sans',
    fontSize: 15,
    fontWeight: 500,
  },
  scoreDrawerText: {
    fontFamily: 'Google Sans',
    fontSize: 18,
    fontWeight: 800,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  scoreDrawerButton: {
    padding: theme.spacing(1.5),
    flexGrow: 1,
    borderRadius: 8,
    marginTop: theme.spacing(3),
    // Thumbs Up
    '&:nth-child(1)': {
      backgroundColor: fade(theme.palette.success.light, 0.7),
      marginRight: theme.spacing(1),
      '&:disabled': {
        backgroundColor: fade(theme.palette.success.light, 0.4),
        color: theme.palette.text.disabled,
      },
    },
    // Thumbs Down
    '&:nth-child(2)': {
      backgroundColor: fade(theme.palette.error.light, 0.7),
      marginLeft: theme.spacing(1),
      '&:disabled': {
        backgroundColor: fade(theme.palette.error.light, 0.4),
        color: theme.palette.text.disabled,
      },
    },
  },
  scoreDrawerScore: {
    fontWeight: 600,
    fontFamily: 'Roboto',
    fontSize: 16,
    marginRight: theme.spacing(1),
  },
  viewsCard: {
    background: theme.palette.action.hover + ' !important',
  },
  favoritesCard: {
    background: fade(theme.palette.primary.main, 0.5),
    transitionDuration: theme.transitions.duration.complex.toString() + 'ms',
    '&:disabled': {
      pointerEvents: 'none',
      opacity: 0.8,
      background: theme.palette.action.hover,
    },
  },
  favoritesCardActive: {
    background: fade(theme.palette.primary.main, 0.7),
    transitionDuration: theme.transitions.duration.complex.toString() + 'ms',
    '&:disabled': {
      pointerEvents: 'none',
      opacity: 0.8,
      background: theme.palette.action.hover,
    },
  },
  commentsCard: {
    background: fade(theme.palette.background.paper, 0.7),
    boxShadow: '0 0 0 2px inset ' + theme.palette.primary.main,
  },
}))

const useCardStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2),
    flexDirection: 'column',
    borderRadius: 8,
    width: '100%',
    alignItems: 'baseline',
    overflow: 'hidden',
  },
  amount: {
    fontFamily: 'Google Sans',
    fontSize: 32,
    fontWeight: 800,
    color: theme.palette.text.primary,
    lineHeight: '32px',
    marginBottom: 2,
  },
  icon: {
    position: 'absolute',
    top: -36,
    right: 0,
    opacity: 0.1,
    borderRadius: 8,
    '& svg': { fontSize: '6.5rem' },
  },
  text: {
    fontFamily: 'Google Sans',
    fontSize: 16,
    lineHeight: '16px',
    fontWeight: 500,
    color: fade(theme.palette.text.primary, 0.5),
  },
  spinner: {
    width: '32px !important',
    height: '32px !important',
  },
  spinnerHolder: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: `calc(100% - ${theme.spacing(2)}px)`,
    heigth: '100%',
  },
}))

interface CardProps {
  className?: string
  amount: number | string
  text: string
  icon: JSX.Element
  disabled?: boolean
  showSpinner?: boolean
  [key: string]: unknown
}

const CardUnmemoized: React.FC<CardProps> = ({
  className,
  amount,
  text,
  icon,
  disabled = false,
  showSpinner = false,
  ...props
}) => {
  const classes = useCardStyles()

  return (
    <Grid xs={6} lg={3} item>
      <ButtonBase
        className={classes.root + ' ' + className}
        disabled={disabled}
        {...props}
      >
        <Fade in={showSpinner} unmountOnExit mountOnEnter>
          <div className={classes.spinnerHolder}>
            <CircularProgress thickness={4} className={classes.spinner} />
          </div>
        </Fade>
        <div className={classes.icon}>{icon}</div>
        <Typography className={classes.amount}>{amount}</Typography>
        <Typography className={classes.text}>{text}</Typography>
      </ButtonBase>
    </Grid>
  )
}
const Card = React.memo(CardUnmemoized)

const ViewsCard: React.FC<{
  post: Post
}> = ({ post }) => {
  const classes = useStyles()
  const reads = formatNumber(Number(post.statistics.readingCount))

  return (
    <Card
      icon={<VisibilityIcon />}
      className={classes.viewsCard}
      amount={reads}
      text={'просмотров'}
    />
  )
}
const ScoreCard: React.FC<{
  post: Post
  onClick: (d: 'down' | 'up', reason?: string) => void
  isFetchingScoreResponse: boolean
  voteState: {
    canVote: Post['relatedData']['canVote']
    vote: Post['relatedData']['vote']
    voteByDefault: boolean
  }
  setDownvoteReasonsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
  isScoreCardDrawerOpen: boolean
  setScoreCardDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
}> = ({
  post,
  onClick,
  isFetchingScoreResponse,
  voteState,
  setDownvoteReasonsDrawerOpen,
  isScoreCardDrawerOpen,
  setScoreCardDrawerOpen,
}) => {
  const { total, negative, positive, score } = getScoreTotal({
    post,
    voteState,
  })
  const theme = useTheme()
  const classes = useStyles()
  const authorizedRequestData = useSelector(
    (store) => store.auth.authorizedRequestData
  )
  const shouldDisableButtons =
    !authorizedRequestData || isFetchingScoreResponse || !voteState.canVote
  const disableUpButton = voteState.vote.value === -1
  const disableDownButton = voteState.vote.value === 1

  const handleScoreButtonUpClick = () => {
    voteState.canVote && onClick('up')
  }
  const handleScoreButtonDownClick = () => {
    if (voteState.canVote) {
      setDownvoteReasonsDrawerOpen(true)
      setScoreCardDrawerOpen(false)
    }
  }

  React.useEffect(() => {
    if (voteState.vote.value === -1 && !isFetchingScoreResponse) {
      setDownvoteReasonsDrawerOpen(false)
    }
  }, [isFetchingScoreResponse])

  return (
    <>
      <Card
        icon={<ThumbsUpDownIcon />}
        style={{ background: fade(getScoreColor(score, theme), 0.7) }}
        amount={score > 0 ? '+' + formatNumber(score) : formatNumber(score)}
        text={'голосов'}
        onClick={() => setScoreCardDrawerOpen(true)}
      />
      <BottomDrawer
        isOpen={isScoreCardDrawerOpen}
        setOpen={setScoreCardDrawerOpen}
        headerText={'Голоса'}
        hideOnDesktop
      >
        <Typography className={classes.scoreDrawerText}>
          Всего голосов: {total}
        </Typography>
        <Grid container direction="row">
          <Grid
            item
            component={ButtonBase}
            className={classes.scoreDrawerButton}
            onClick={handleScoreButtonUpClick}
            disableRipple={!voteState.canVote}
            disabled={shouldDisableButtons || disableUpButton}
          >
            <span className={classes.scoreDrawerScore}>{positive}</span>
            <ThumbUpAltRoundedIcon />
          </Grid>
          <Grid
            item
            component={ButtonBase}
            className={classes.scoreDrawerButton}
            onClick={handleScoreButtonDownClick}
            disableRipple={!voteState.canVote}
            disabled={shouldDisableButtons || disableDownButton}
          >
            <span className={classes.scoreDrawerScore}>{negative}</span>
            <ThumbDownAltRoundedIcon />
          </Grid>
        </Grid>
      </BottomDrawer>
    </>
  )
}
const FavoritesCard: React.FC<{
  post: Post
  isBookmarked: boolean
  isFetchingBookmarkResponse: boolean
  onClick: () => void
}> = ({ post, isBookmarked, onClick, isFetchingBookmarkResponse }) => {
  const favorites = getFavoritesCount({ post, isBookmarked })
  const classes = useStyles()

  return (
    <Card
      icon={<BookmarkIcon />}
      className={
        classes[isBookmarked ? 'favoritesCardActive' : 'favoritesCard']
      }
      amount={favorites}
      showSpinner={isFetchingBookmarkResponse}
      disabled={isFetchingBookmarkResponse}
      text={'в закладках'}
      onClick={onClick}
    />
  )
}
const CommentsCard: React.FC<{
  post: Post
}> = ({ post }) => {
  const classes = useStyles()
  const comments = formatNumber(Number(post.statistics.commentsCount))
  const postLink = getPostLink(post)
  const history = useHistory()

  return (
    <Card
      icon={<CommentsIcon />}
      className={classes.commentsCard}
      amount={comments}
      text={'комментариев'}
      onClick={() =>
        history.push(postLink + '/comments', {
          from: location.pathname,
          scroll: window.pageYOffset,
        })
      }
    />
  )
}

const Statistics = ({ post }: { post: Post }) => {
  const { enqueueSnackbar } = useSnackbar()
  const { id, titleHtml: title, statistics } = post
  const { commentsCount, readingCount } = statistics
  const [isScoreCardDrawerOpen, setScoreCardDrawerOpen] = useState(false)
  const [isDownvoteReasonsDrawerOpen, setDownvoteReasonsDrawerOpen] = useState(
    false
  )
  const [currentDownvoteReason, setCurrentDownvoteReason] = useState<string>(
    '1'
  )
  const authData = useSelector((store) => store.auth.authData.data)
  const authorizedRequestData = useSelector(
    (store) => store.auth.authorizedRequestData
  )
  const [isBookmarked, setBookmarkState] = useState(
    post?.relatedData?.bookmarked
  )
  const [isFetchingBookmarkResponse, setIsFetchingBookmarkResponse] = useState(
    false
  )
  const [voteState, setVoteState] = useState({
    canVote: post?.relatedData?.canVote || false,
    vote: post?.relatedData?.vote || {
      value: 0,
      voteTimeExpired: null,
    },
    voteByDefault: !!post?.relatedData?.vote,
  })
  const [isFetchingScoreResponse, setIsFetchingScoreResponse] = useState(false)
  const classes = useStyles()
  const classesDesktop = useDesktopStyles()
  const { total: totalScore, negative, positive, score } = getScoreTotal({
    post,
    voteState,
  })
  const reads = formatNumber(Number(readingCount))
  const comments = formatNumber(Number(commentsCount))
  const favorites = getFavoritesCount({ post, isBookmarked })
  const postLink = getPostLink(post)
  const shouldDisableScoreButtons =
    !authorizedRequestData || isFetchingScoreResponse || !voteState.canVote
  const isScoreUpButtonDisabled = voteState.vote.value === -1
  const isScoreDownButtonDisabled = voteState.vote.value === 1
  const downvoteReasonsFetchState = useSelector(
    (store) => store.post.downvoteReasons.state
  )
  const downvoteReasons = useSelector(
    (store) => store.post.downvoteReasons.data
  )
  const share = () => {
    const shareData = {
      title,
      url: process.env.PUBLIC_URL + '/post/' + id,
    }

    navigator.share(shareData).catch((e) => {
      if (e.message.startsWith('Internal error:')) {
        console.log('On share in Statistics:', e)
        enqueueSnackbar('Не удалось поделиться статьей', {
          variant: 'error',
          autoHideDuration: 3000,
        })
      }
    })
  }

  const handleFavoriteClick = async () => {
    if (isFetchingBookmarkResponse) return
    if (authData) {
      setIsFetchingBookmarkResponse(true)
      const response = await setArticleBookmark({
        mode: isBookmarked ? 'remove' : 'add',
        authData: authorizedRequestData,
        id: post.id,
      })
      if (response.ok) {
        setBookmarkState((prev) => !prev)
      } else {
        enqueueSnackbar('Произошла ошибка', {
          variant: 'error',
          autoHideDuration: 4000,
        })
        console.error('Error in handleFavoriteClick:', response)
      }
      setIsFetchingBookmarkResponse(false)
    } else {
      enqueueSnackbar('Нужна авторизация', {
        variant: 'error',
        autoHideDuration: 4000,
      })
    }
  }

  const handleScoreClick = async (mode: 'up' | 'down', reason?: string) => {
    if (isFetchingScoreResponse) return
    if (authData) {
      setIsFetchingScoreResponse(true)
      const response = await setArticleVote({
        mode,
        authData: authorizedRequestData,
        id: post.id,
        reason,
      })
      if (response?.score) {
        setVoteState({
          vote: response.vote,
          canVote: response.canVote,
          voteByDefault: false,
        })
      } else if (
        ((response as unknown) as APIError)?.additional[0] ===
        'POST_VOTE_DUPLICATE'
      ) {
        enqueueSnackbar('Повторное голосование запрещено', {
          variant: 'error',
          autoHideDuration: 4000,
        })
      } else {
        enqueueSnackbar('Произошла ошибка', {
          variant: 'error',
          autoHideDuration: 4000,
        })
        console.error('Error in handleScoreClick:', response)
      }
      setIsFetchingScoreResponse(false)
    } else {
      enqueueSnackbar('Нужна авторизация', {
        variant: 'error',
        autoHideDuration: 4000,
      })
    }
  }

  const handleDownvoteReasonChange = (
    _event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setCurrentDownvoteReason(value)
  }
  const handleConfirmDownvoteButtonClick = () => {
    if (!voteState.canVote) return
    handleScoreClick('down', currentDownvoteReason)
  }
  const handleScoreButtonDownClick = () => {
    if (voteState.canVote) {
      setDownvoteReasonsDrawerOpen(true)
      setScoreCardDrawerOpen(false)
    }
  }
  const handleScoreButtonUpClick = () => {
    voteState.canVote && handleScoreClick('up')
  }

  return (
    <>
      {/** Desktop Statistics */}
      <div className={classesDesktop.root}>
        <div className={classesDesktop.card}>
          <div className={classesDesktop.section}>
            <IconButton
              className={
                classesDesktop[
                  isScoreDownButtonDisabled ? 'scoreUpActive' : 'grayIcon'
                ]
              }
              onClick={handleScoreButtonUpClick}
              disabled={shouldDisableScoreButtons || isScoreUpButtonDisabled}
            >
              <Icon16Up width={24} height={24} />
            </IconButton>
            <GreenRedNumber
              number={post.statistics.score}
              wrapperProps={{ className: classesDesktop.scoreWrapper }}
            >
              <Tooltip
                placement="top"
                title={`Всего голосов ${totalScore}: ↑${positive} и ↓${negative}`}
                arrow
              >
                <Typography className={classesDesktop.score}>
                  {score > 0 ? '+' : ''}
                  {score}
                </Typography>
              </Tooltip>
            </GreenRedNumber>
            <IconButton
              className={
                classesDesktop[
                  isScoreUpButtonDisabled ? 'scoreDownActive' : 'grayIcon'
                ]
              }
              onClick={handleScoreButtonDownClick}
              disabled={shouldDisableScoreButtons || isScoreDownButtonDisabled}
            >
              <Icon16Down width={24} height={24} />
            </IconButton>
          </div>
          <div className={classesDesktop.section}>
            <IconButton
              className={classesDesktop.grayIcon}
              onClick={handleFavoriteClick}
              color={isBookmarked ? 'primary' : 'default'}
            >
              {isFetchingBookmarkResponse && (
                <CircularProgress
                  className={classesDesktop.spinner}
                  thickness={4}
                />
              )}
              {!isFetchingBookmarkResponse && (
                <BookmarkIcon color={isBookmarked ? 'primary' : 'inherit'} />
              )}
            </IconButton>
            <Typography className={classesDesktop.score}>
              {favorites}
            </Typography>
          </div>
          <div className={classesDesktop.section} style={{ marginLeft: 8 }}>
            <VisibilityIcon className={classesDesktop.grayIcon} />
            <Typography className={classesDesktop.score}>{reads}</Typography>
          </div>
          <div className={classesDesktop.section} style={{ marginLeft: 16 }}>
            <Button
              className={classesDesktop.shareButton}
              variant="text"
              onClick={share}
              startIcon={<ShareIcon height={20} width={20} />}
            >
              Поделиться
            </Button>
          </div>
        </div>
        <Link
          to={postLink + '/comments'}
          className={classesDesktop.commentsCardLink}
        >
          <ButtonBase className={classesDesktop.commentsCard}>
            Комментарии
            <span className={classesDesktop.commentsAmount}>{comments}</span>
            <Icon24ChevronCompactRight
              className={classesDesktop.commentsChevronRightIcon}
            />
          </ButtonBase>
        </Link>
      </div>

      {/** Mobile Statistics */}
      <div className={classes.root}>
        <Typography className={classes.title}>Статистика</Typography>
        <Grid container direction="row" spacing={2}>
          <ViewsCard post={post} />
          <ScoreCard
            post={post}
            onClick={handleScoreClick}
            isFetchingScoreResponse={isFetchingScoreResponse}
            voteState={voteState}
            setDownvoteReasonsDrawerOpen={setDownvoteReasonsDrawerOpen}
            isScoreCardDrawerOpen={isScoreCardDrawerOpen}
            setScoreCardDrawerOpen={setScoreCardDrawerOpen}
          />
          <FavoritesCard
            post={post}
            onClick={handleFavoriteClick}
            isFetchingBookmarkResponse={isFetchingBookmarkResponse}
            isBookmarked={isBookmarked}
          />
          <CommentsCard post={post} />
        </Grid>
        <Button
          className={classes.shareButton}
          variant="text"
          onClick={share}
          startIcon={<ShareIcon height={20} width={20} />}
        >
          Поделиться
        </Button>
      </div>

      <BottomDrawer
        isOpen={isDownvoteReasonsDrawerOpen}
        setOpen={setDownvoteReasonsDrawerOpen}
        headerText={'Причина минуса'}
      >
        <Typography gutterBottom>
          Укажите причину минуса, чтобы автор поработал над ошибками
        </Typography>
        {downvoteReasonsFetchState === FetchingState.Fetched && (
          <RadioGroup
            aria-label="downvote-reasons"
            name="downvote-reasons"
            value={currentDownvoteReason}
            onChange={handleDownvoteReasonChange}
          >
            {downvoteReasons.map((e) => (
              <FormControlLabel
                value={e.id}
                key={e.id}
                control={
                  <Radio disabled={shouldDisableScoreButtons} color="primary" />
                }
                label={e.title}
              />
            ))}
          </RadioGroup>
        )}
        <Button
          color="primary"
          disableElevation
          className={classes.confirmDownvoteButton}
          fullWidth
          disabled={shouldDisableScoreButtons}
          variant="contained"
          onClick={handleConfirmDownvoteButtonClick}
        >
          Отправить анонимно
        </Button>
      </BottomDrawer>
    </>
  )
}

export default React.memo(Statistics)
