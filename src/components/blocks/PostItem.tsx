import * as React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown'
import VisibilityIcon from '@material-ui/icons/Visibility'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'
import { makeStyles, darken, lighten } from '@material-ui/core/styles'
import formatNumber from 'src/utils/formatNumber'
import GreenRedNumber from 'src/components/formatters/GreenRedNumber'
import moment from 'moment'
import parse from 'html-react-parser'
import { Post } from 'src/interfaces'
import UserAvatar from './UserAvatar'
import { POST_IMAGE_HEIGHT } from 'src/config/constants'

const ld = { lighten, darken }
const useStyles = makeStyles((theme) => ({
  noDeco: {
    textDecoration: 'none !important',
  },
  postLink: {
    color: theme.palette.text.primary,
    '&:visited > p': {
      color: ld[theme.palette.type + 'en'](theme.palette.text.primary, 0.4),
    },
  },
  paper: {
    background: theme.palette.background.paper,
    borderRadius: 0,
    marginBottom: theme.spacing(2),
  },
  padding: {
    padding: theme.spacing(2),
    width: '100%',
  },
  imageHolder: {
    maxWidth: '100%',
    width: '100%',
    display: 'flex',
    backgroundColor: theme.palette.action.hover,
    height: (hasImage) => (hasImage ? POST_IMAGE_HEIGHT : '100%'),
    marginBottom: (hasImage) => (hasImage ? theme.spacing(2) : 0),
  },
  image: {
    maxWidth: '100%',
    height: '100%',
    objectFit: 'cover',
    width: '100%',
  },
  postTitle: {
    fontWeight: 800,
    fontFamily: '"Google Sans"',
    fontSize: 20,
    marginTop: (hasImage) => (hasImage ? 0 : theme.spacing(1)),
    '& .searched-item': {
      color: theme.palette.primary.light, // Highlight the search query in post's title
    },
  },
  previewHTML: {
    marginTop: theme.spacing(1),
    '& .searched-item': {
      color: theme.palette.primary.light,
    },
  },
  postAuthor: {
    color: theme.palette.primary.light,
    marginRight: theme.spacing(1),
    fontWeight: 800,
  },
  postTs: {
    color: theme.palette.text.hint,
  },
  postAvatar: {
    width: theme.spacing(2.5),
    height: theme.spacing(2.5),
    marginRight: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
  },
  postBottomRow: {
    marginTop: theme.spacing(2),
  },
  postBottomRowItem: {
    color: theme.palette.text.hint,
    fontSize: 8,
    textDecoration: 'none',
    padding: 0,
  },
  postBottomRowItemIcon: {
    fontSize: 16,
    marginRight: theme.spacing(1),
  },
  avatarContainer: {
    width: '100%',
    padding: theme.spacing(2),
    textDecoration: 'none !important',
    paddingBottom: (hasImage) => (hasImage ? theme.spacing(2) : 0),
  },
}))

export const PostItem = ({
  post,
  showPreview,
  style,
}: {
  post: Post
  showPreview?: boolean
  style?: Record<string, unknown>
}) => {
  const [isBookmarked, setBookmarkState] = React.useState<boolean>()
  const ts = moment(post.time_published).calendar().toLowerCase()
  const { login, avatar } = post.author
  const {
    title: unparsedTitle,
    id,
    score: sc,
    reading_count: readingCount,
    favorites_count: favoritesCount,
    comments_count: commentsCount,
    preview_html: previewHTML,
    metadata,
  } = post
  const { meta_image: metaImage, description } = metadata
  const title = parse(unparsedTitle)
  const reads = formatNumber(readingCount)
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
      icon: VisibilityIcon,
      count: reads,
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
  const hasImage = !!metaImage
  const classes = useStyles(hasImage)

  return (
    <Paper elevation={0} className={classes.paper} style={style}>
      <Grid container>
        <Link to={'/user/' + login} className={classes.avatarContainer}>
          <Grid alignItems="center" container direction="row">
            <UserAvatar
              src={avatar}
              login={login}
              className={classes.postAvatar}
            />
            <Typography className={classes.postAuthor} variant="caption">
              {login}
            </Typography>
            <Typography className={classes.postTs} variant="caption">
              {ts}
            </Typography>
          </Grid>
        </Link>
        <Grid item className={classes.imageHolder}>
          <Link
            style={{ display: 'flex', width: '100%' }}
            to={'/article/' + id}
          >
            {hasImage && (
              <img
                className={classes.image}
                src={metaImage}
                alt={description}
              />
            )}
          </Link>
        </Grid>
        <div style={{ paddingTop: 0 }} className={classes.padding}>
          <Grid item xs={12}>
            <Link
              className={classes.postLink + ' ' + classes.noDeco}
              to={'/article/' + id}
            >
              <Typography className={classes.postTitle}>{title}</Typography>
            </Link>
          </Grid>
          {showPreview && (
            <Grid className={classes.previewHTML} item>
              <Typography>{parse(previewHTML)}</Typography>
            </Grid>
          )}
          <Grid
            className={classes.postBottomRow}
            container
            style={{ width: '100%' }}
          >
            {bottomRow.map((item, i) => (
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="center"
                style={{
                  width: '25%',
                  cursor: item.isButton || item.to ? 'pointer' : 'inherit',
                }}
                key={i}
                to={item.to}
                color={item.isActive ? 'primary' : 'default'}
                component={item.to ? Link : Grid}
                onClick={item.action || null}
                className={classes.postBottomRowItem}
              >
                <item.icon
                  className={classes.postBottomRowItemIcon}
                  color={item.isActive ? 'primary' : 'inherit'}
                />
                <div style={{ fontSize: 12, fontWeight: 600 }}>
                  {item.coloredText ? (
                    <GreenRedNumber
                      number={item.count}
                      defaultClass={classes.postBottomRowItem}
                      style={{ fontSize: 12, fontWeight: 600 }}
                    />
                  ) : (
                    item.count
                  )}
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </Grid>
    </Paper>
  )
}

export default PostItem
