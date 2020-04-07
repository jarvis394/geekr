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
import { useScrollTrigger, Slide } from '@material-ui/core'
import formatNumber from 'src/utils/formatNumber'
import GreenRedNumber from 'src/components/formatters/GreenRedNumber'
import { Post } from 'src/interfaces'

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth,
    padding: 0,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    position: 'sticky',
    bottom: 0,
    height: 48,
    flexGrow: 1,
    borderTop: '1px solid ' + theme.palette.divider,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    zIndex: 999,
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

interface HideOnScrollProps {
  children: React.ReactElement
  disabled?: boolean
}

const HideOnScroll = (props: HideOnScrollProps) => {
  const { children, disabled } = props
  const trigger = useScrollTrigger({ target: window })

  return disabled ? (
    children
  ) : (
    <Slide
      mountOnEnter
      unmountOnExit
      appear={false}
      direction="up"
      in={!trigger}
    >
      {children}
    </Slide>
  )
}

const Component = ({
  post,
  sticky = false,
}: {
  post: Post.Post
  sticky?: boolean
}) => {
  const {
    id,
    title,
    score: sc,
    favorites_count: favoritesCount,
    comments_count: commentsCount,
  } = post
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
      count: score,
      coloredText: true,
    },
    {
      icon: BookmarkIcon,
      count: favorites,
      isButton: true,
      isActive: isBookmarked,
      action: () => {
        setBookmarkState((prev) => !prev)
      },
    },
    {
      icon: ChatBubbleIcon,
      count: comments,
      to: '/article/' + id + '/comments',
    },
  ]

  const share = () => {
    const shareData = {
      title,
      url: process.env.PUBLIC_URL + '/article/' + id,
    }

    navigator
      .share(shareData)
      .catch((e: Error) => console.error('On sharing post:', e))
  }

  return (
    <HideOnScroll disabled={!sticky}>
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
                  number={item.count}
                  defaultClass={classes.item}
                  style={{ fontSize: 12, fontWeight: 600 }}
                />
              ) : (
                item.count
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
    </HideOnScroll>
  )
}

export default React.memo(Component)
