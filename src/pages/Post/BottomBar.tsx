import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { MIN_WIDTH as maxWidth } from 'src/config/constants'
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import VisibilityIcon from '@material-ui/icons/Visibility'
import CommentsIocn from '@material-ui/icons/CommentRounded'
import ThumbDownAltRoundedIcon from '@material-ui/icons/ThumbDownAltRounded'
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded'
import { Icon28ShareOutline as ShareIcon } from '@vkontakte/icons'
import formatNumber from 'src/utils/formatNumber'
import { Post } from 'src/interfaces'
import { Button, ButtonBase, fade, Theme, Typography } from '@material-ui/core'
import { useHistory, useLocation } from 'react-router'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import BottomDrawer from 'src/components/blocks/BottomDrawer'
import getInvertedContrastPaperColor from 'src/utils/getInvertedContrastPaperColor'

const getScoreColor = (score: number, theme: Theme) => {
  if (score === 0) return theme.palette.background.paper
  else if (score > 0) return theme.palette.success.main
  else if (score < 0) return theme.palette.error.main
}

const useStyles = makeStyles<Theme, { score: number }, string>((theme) => ({
  container: {
    maxWidth,
    color: theme.palette.text.primary,
    position: 'relative',
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    zIndex: 5,
    flexDirection: 'column',
  },
  title: {
    fontFamily: 'Google Sans',
    fontWeight: 800,
    color: theme.palette.primary.main,
    fontSize: 24,
    textAlign: 'left',
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    lineHeight: '24px',
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
    background: getInvertedContrastPaperColor(theme),
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
  const location = useLocation()
  const score = Number(sc)
  const comments = formatNumber(Number(commentsCount))
  const favorites = Number(favoritesCount)
  const reads = formatNumber(Number(readingCount))
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
      <Grid xs={6} md={3} item {...props}>
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
              <span className={classes.scoreDrawerScore}>
                {positive !== 0 && '+'}
                {positive}
              </span>
              <ThumbUpAltRoundedIcon />
            </Grid>
            <Grid
              item
              component={ButtonBase}
              className={classes.scoreDrawerButton}
              onClick={() => setScoreCardDrawerOpen(false)}
            >
              <span className={classes.scoreDrawerScore}>
                {negative !== 0 && '-'}
                {negative}
              </span>
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
          history.push('/post/' + id + '/comments', {
            from: location.pathname,
          })
        }
      />
    )
  })

  return (
    <>
      <Typography className={classes.title}>Статистика</Typography>
      <Container className={classes.container}>
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
      </Container>
    </>
  )
}

export default React.memo(BottomBar)
