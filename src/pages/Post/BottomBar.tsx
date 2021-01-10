import * as React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { MIN_WIDTH as maxWidth } from 'src/config/constants'
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import VisibilityIcon from '@material-ui/icons/Visibility'
import ShareIcon from '@material-ui/icons/Share'
import formatNumber from 'src/utils/formatNumber'
import GreenRedNumber from 'src/components/formatters/GreenRedNumber'
import { Post } from 'src/interfaces'
import { ButtonBase, fade, Typography } from '@material-ui/core'
import { useHistory } from 'react-router'

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth,
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    position: 'relative',
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    zIndex: 5,
  },
  shareIcon: {
    color: theme.palette.text.hint,
    fontSize: 16,
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2),
    flexDirection: 'column',
    borderRadius: 8,
    width: '100%',
    alignItems: 'baseline',
  },
  cardAmount: {
    fontFamily: 'Google Sans',
    fontSize: 36,
    fontWeight: 800,
    color: theme.palette.text.primary,
    lineHeight: '36px',
  },
  cardText: {
    fontFamily: 'Google Sans',
    fontSize: 18,
    fontWeight: 800,
    color: fade(theme.palette.text.primary, 0.5),
  },
  viewsCard: {
    background: fade(theme.palette.background.paper, 0.7),
  },
  scoreCard: {
    background: (score: number) =>
      fade(
        score === 0
          ? theme.palette.background.paper
          : score > 0
          ? theme.palette.success.main
          : theme.palette.error.main,
        0.7
      ),
  },
  favoritesCard: {
    background: fade(theme.palette.primary.main, 0.7),
  },
  commentsCard: {
    background: fade(theme.palette.background.paper, 0.7),
  },
}))

const BottomBar = ({ post }: { post: Post }) => {
  const { id, titleHtml: title, statistics } = post
  const { favoritesCount, readingCount, score: sc, commentsCount } = statistics
  const [isBookmarked, setBookmarkState] = React.useState<boolean>(false)
  const classes = useStyles(sc)
  const score = formatNumber(Number(sc))
  const comments = formatNumber(Number(commentsCount))
  const favorites = formatNumber(
    Number(favoritesCount) + (isBookmarked ? 1 : 0)
  )
  const reads = formatNumber(Number(readingCount))
  const history = useHistory()
  const share = () => {
    const shareData = {
      title,
      url: process.env.PUBLIC_URL + '/post/' + id,
    }

    navigator
      .share(shareData)
      .catch((e: Error) => console.error('On sharing post:', e))
  }

  const Card = ({ className, amount, text, ...props }) => {
    console.log('rerender', className)
    return (
      <Grid xs={6} md={3} item {...props}>
        <ButtonBase className={classes.card + ' ' + className}>
          <Typography className={classes.cardAmount}>{amount}</Typography>
          <Typography className={classes.cardText}>{text}</Typography>
        </ButtonBase>
      </Grid>
    )
  }
  const ViewsCard = React.memo(function ViewsCardUnmemoized() {
    return (
      <Card className={classes.viewsCard} amount={reads} text={'просмотров'} />
    )
  })
  const ScoreCard = React.memo(function ScoreCardUnmemoized() {
    return (
      <Card className={classes.scoreCard} amount={score} text={'голосов'} />
    )
  })
  const FavoritesCard = React.memo(function FavoritesCardUnmemoized() {
    return (
      <Card
        className={classes.favoritesCard}
        amount={favorites}
        text={'в закладках'}
        onClick={() => setBookmarkState((prev) => !prev)}
      />
    )
  })
  const CommentsCard = React.memo(function CommentsCardUnmemoized() {
    return (
      <Card
        className={classes.commentsCard}
        amount={comments}
        text={'комментариев'}
        onClick={() => history.push('/post/' + id + '/comments')}
      />
    )
  })

  return (
    <Container className={classes.container}>
      <Grid container direction="row" spacing={2}>
        <ViewsCard />
        <ScoreCard />
        <FavoritesCard />
        <CommentsCard />
      </Grid>
      {navigator.share && (
        <Grid container direction="row" alignItems="center" justify="center">
          <ShareIcon onClick={() => share()} className={classes.shareIcon} />
        </Grid>
      )}
    </Container>
  )
}

export default React.memo(BottomBar)
