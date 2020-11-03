import * as React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import { MIN_WIDTH as maxWidth } from 'src/config/constants'
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'
import ShareIcon from '@material-ui/icons/Share'
import formatNumber from 'src/utils/formatNumber'
import GreenRedNumber from 'src/components/formatters/GreenRedNumber'
import { Post } from 'src/interfaces'

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth,
    padding: 0,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    position: 'relative',
    bottom: 0,
    height: 48,
    flexGrow: 1,
    borderTop: '1px solid ' + theme.palette.divider,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    zIndex: 5,
  },
  item: {
    color: theme.palette.text.hint,
    fontSize: 8,
    textDecoration: 'none',
    padding: 0,
    height: '100%',
  },
  icon: {
    fontSize: 16,
    marginRight: theme.spacing(1),
  },
  shareIcon: {
    color: theme.palette.text.hint,
    fontSize: 16,
  },
}))

const BottomBar = ({ post }: { post: Post }) => {
  const { id, titleHtml: title, statistics } = post
  const { favoritesCount, commentsCount, score: sc } = statistics
  const [isBookmarked, setBookmarkState] = React.useState<boolean>(false)
  const classes = useStyles()
  const score = formatNumber(Number(sc))
  const favorites = formatNumber(
    Number(favoritesCount) + (isBookmarked ? 1 : 0)
  )
  const comments = formatNumber(Number(commentsCount))
  const bottomRow = [
    {
      icon: ThumbsUpDownIcon,
      number: score,
      coloredText: true,
    },
    {
      icon: BookmarkIcon,
      number: favorites,
      isButton: true,
      isActive: isBookmarked,
      action: () => {
        setBookmarkState((prev) => !prev)
      },
    },
    {
      icon: ChatBubbleIcon,
      number: comments,
      isButton: true,
      to: '/post/' + id + '/comments',
    },
  ]

  const share = () => {
    const shareData = {
      title,
      url: process.env.PUBLIC_URL + '/post/' + id,
    }

    navigator
      .share(shareData)
      .catch((e: Error) => console.error('On sharing post:', e))
  }

  return (
    <Container className={classes.container}>
      {bottomRow.map((item, i) => (
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="center"
          key={i}
          to={item.to}
          color={item.isActive ? 'primary' : 'default'}
          component={item.to ? Link : Grid}
          style={{ cursor: item.isButton ? 'pointer' : 'inherit' }}
          onClick={item.action || null}
          className={classes.item}
        >
          <item.icon
            className={classes.icon}
            color={item.isActive ? 'primary' : 'inherit'}
          />
          <div style={{ fontSize: 12, fontWeight: 600 }}>
            {item.coloredText ? (
              <GreenRedNumber
                number={item.number}
                defaultClass={classes.item}
                style={{ fontSize: 12, fontWeight: 600 }}
              />
            ) : (
              item.number
            )}
          </div>
        </Grid>
      ))}
      {navigator.share && (
        <Grid container direction="row" alignItems="center" justify="center">
          <ShareIcon onClick={() => share()} className={classes.shareIcon} />
        </Grid>
      )}
    </Container>
  )
}

export default React.memo(BottomBar)
