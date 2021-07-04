import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { MIDDLE_WIDTH, MIN_WIDTH } from 'src/config/constants'
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import VisibilityIcon from '@material-ui/icons/Visibility'
import CommentsIocn from '@material-ui/icons/CommentRounded'
import ThumbDownAltRoundedIcon from '@material-ui/icons/ThumbDownAltRounded'
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded'
import { Icon28ShareOutline as ShareIcon } from '@vkontakte/icons'
import formatNumber from 'src/utils/formatNumber'
import { Post } from 'src/interfaces'
import {
  Button,
  ButtonBase,
  fade,
  IconButton,
  Theme,
  Typography,
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
      flexDirection: 'column'
    },
    [theme.breakpoints.between(MIN_COMMENTS_BUTTON_WIDTH, MIDDLE_WIDTH)]: {
      flexDirection: 'row'
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
  shareButton: {
    width: '100%',
    borderRadius: 8,
    height: 48,
    color: theme.palette.text.secondary,
    textTransform: 'none',
    fontSize: 16,
    fontFamily: 'Google Sans'
  },
  card: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 8,
    padding: theme.spacing(0, 2),
    display: 'flex',
    gap: theme.spacing(1),
    height: 48
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
    textDecoration: 'none'
  },
  commentsAmount: {
    marginLeft: theme.spacing(1),
    color: theme.palette.primary.main
  },
  score: {
    fontSize: 16,
    fontWeight: 600,
    fontFamily: 'Google Sans'
  },
}))

const useStyles = makeStyles<Theme, { score: number }, string>((theme) => ({
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
  card: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2),
    flexDirection: 'column',
    borderRadius: 8,
    width: '100%',
    alignItems: 'baseline',
    overflow: 'hidden',
  },
  cardAmount: {
    fontFamily: 'Google Sans',
    fontSize: 32,
    fontWeight: 800,
    color: theme.palette.text.primary,
    lineHeight: '32px',
    marginBottom: 2,
  },
  cardIcon: {
    position: 'absolute',
    top: -36,
    right: 0,
    opacity: 0.1,
    borderRadius: 8,
    '& svg': { fontSize: '6.5rem' },
  },
  cardText: {
    fontFamily: 'Google Sans',
    fontSize: 16,
    lineHeight: '16px',
    fontWeight: 500,
    color: fade(theme.palette.text.primary, 0.5),
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
    },
    // Thumbs Down
    '&:nth-child(2)': {
      backgroundColor: fade(theme.palette.error.light, 0.7),
      marginLeft: theme.spacing(1),
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
  scoreCard: {
    background: ({ score }: { score: number }) =>
      fade(getScoreColor(score, theme), 0.7),
  },
  favoritesCard: {
    background: fade(theme.palette.primary.main, 0.7),
  },
  commentsCard: {
    background: fade(theme.palette.background.paper, 0.7),
    boxShadow: '0 0 0 2px inset ' + theme.palette.primary.main,
  },
}))

const BottomBar = ({ post }: { post: Post }) => {
  const { enqueueSnackbar } = useSnackbar()
  const { id, titleHtml: title, statistics } = post
  const { score: sc, favoritesCount, commentsCount, readingCount } = statistics

  const classes = useStyles({ score: sc })
  const classesDesktop = useDesktopStyles()
  const location = useLocation()
  const score = Number(sc)
  const comments = formatNumber(Number(commentsCount))
  const favorites = Number(favoritesCount)
  const reads = formatNumber(Number(readingCount))
  const postLink = getPostLink(post)
  const history = useHistory()
  const share = () => {
    const shareData = {
      title,
      url: process.env.PUBLIC_URL + '/post/' + id,
    }

    try {
      navigator.share(shareData)
    } catch (e) {
      enqueueSnackbar('Не удалось поделиться статьей', {
        variant: 'error',
        autoHideDuration: 3000,
      })
    }
  }

  const Card = ({ className, amount, text, icon, ...props }) => {
    return (
      <Grid xs={6} lg={3} item {...props}>
        <ButtonBase className={classes.card + ' ' + className}>
          <div className={classes.cardIcon}>{icon}</div>
          <Typography className={classes.cardAmount}>{amount}</Typography>
          <Typography className={classes.cardText}>{text}</Typography>
        </ButtonBase>
      </Grid>
    )
  }
  const ViewsCard = React.memo(function ViewsCardUnmemozed() {
    return (
      <Card
        icon={<VisibilityIcon />}
        className={classes.viewsCard}
        amount={reads}
        text={'просмотров'}
      />
    )
  })
  const ScoreCard = React.memo(function ScoreCardUnmemoized() {
    const [isScoreCardDrawerOpen, setScoreCardDrawerOpen] = useState(false)
    const total = statistics.votesCount
    const positive = (total + score) / 2
    const negative = (total - score) / 2

    return (
      <>
        <Card
          icon={<ThumbsUpDownIcon />}
          className={classes.scoreCard}
          amount={score > 0 ? '+' + formatNumber(score) : formatNumber(score)}
          text={'голосов'}
          onClick={() => setScoreCardDrawerOpen((prev) => !prev)}
        />
        <BottomDrawer
          isOpen={isScoreCardDrawerOpen}
          setOpen={setScoreCardDrawerOpen}
          headerText={'Голоса'}
        >
          <Typography className={classes.scoreDrawerText}>
            Всего голосов: {total}
          </Typography>
          <Grid container direction="row">
            <Grid
              item
              component={ButtonBase}
              className={classes.scoreDrawerButton}
              onClick={() => setScoreCardDrawerOpen(false)}
            >
              <span className={classes.scoreDrawerScore}>{positive}</span>
              <ThumbUpAltRoundedIcon />
            </Grid>
            <Grid
              item
              component={ButtonBase}
              className={classes.scoreDrawerButton}
              onClick={() => setScoreCardDrawerOpen(false)}
            >
              <span className={classes.scoreDrawerScore}>{negative}</span>
              <ThumbDownAltRoundedIcon />
            </Grid>
          </Grid>
        </BottomDrawer>
      </>
    )
  })
  const FavoritesCard = React.memo(function FavoritesCardUnmemoized() {
    const [isBookmarked, setBookmarkState] = React.useState<boolean>(false)
    return (
      <Card
        icon={<BookmarkIcon />}
        className={classes.favoritesCard}
        amount={formatNumber(favorites + (isBookmarked ? 1 : 0))}
        text={'в закладках'}
        onClick={() => setBookmarkState((prev) => !prev)}
      />
    )
  })
  const CommentsCard = React.memo(function CommentsCardUnmemoized() {
    return (
      <Card
        icon={<CommentsIocn />}
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
  })

  return (
    <>
      <div className={classesDesktop.root}>
        <div className={classesDesktop.card}>
          <div className={classesDesktop.section}>
            <IconButton className={classesDesktop.grayIcon}>
              <Icon16Up width={24} height={24} />
            </IconButton>
            <GreenRedNumber
              number={post.statistics.score}
              wrapperProps={{ className: classesDesktop.scoreWrapper }}
            >
              <Typography className={classesDesktop.score}>
                {score > 0 ? '+' : ''}
                {score}
              </Typography>
            </GreenRedNumber>
            <IconButton className={classesDesktop.grayIcon}>
              <Icon16Down width={24} height={24} />
            </IconButton>
          </div>
          <div className={classesDesktop.section}>
            <IconButton className={classesDesktop.grayIcon}>
              <BookmarkIcon />
            </IconButton>
            <Typography className={classesDesktop.score}>{comments}</Typography>
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
        <Link to={postLink + '/comments'} className={classesDesktop.commentsCardLink}>
          <ButtonBase className={classesDesktop.commentsCard}>
            Комментарии<span className={classesDesktop.commentsAmount}>{comments}</span>
            <Icon24ChevronCompactRight
              className={classesDesktop.commentsChevronRightIcon}
            />
          </ButtonBase>
        </Link>
      </div>
      <div className={classes.root}>
        <Typography className={classes.title}>Статистика</Typography>
        <Grid container direction="row" spacing={2}>
          <ViewsCard />
          <ScoreCard />
          <FavoritesCard />
          <CommentsCard />
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
    </>
  )
}

export default React.memo(BottomBar)
