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
import dayjs from 'dayjs'
import parse from 'html-react-parser'
import { Post } from 'src/interfaces'
import UserAvatar from './UserAvatar'
import { POST_IMAGE_HEIGHT } from 'src/config/constants'
import LazyLoadImage from './LazyLoadImage'
import { useSelector } from 'src/hooks'
import RightIcon from '@material-ui/icons/ChevronRightRounded'
import { Chip } from '@material-ui/core'
import { POST_LABELS as postLabels } from 'src/config/constants'

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
    flexGrow: 1,
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
  trollText: {
    color: theme.palette.text.hint,
    fontFamily: 'Google Sans',
    fontWeight: 500,
    flexGrow: 1,
  },
  trollLink: {
    color: theme.palette.primary.main,
    fontFamily: 'Google Sans',
    fontWeight: 500,
    textDecoration: 'none',
  },
}))

export const PostItem = ({
  post,
  style,
}: {
  post: Post
  style?: Record<string, unknown>
}) => {
  const hiddenAuthors = useSelector((state) => state.settings.hiddenAuthors)
  const hiddenCompanies = useSelector((state) => state.settings.hiddenCompanies)
  const [isBookmarked, setBookmarkState] = React.useState<boolean>()
  const ts = dayjs(post.timePublished).calendar().toLowerCase()
  const { login, avatarUrl } = post.author
  const { titleHtml: unparsedTitle, id, statistics, leadData } = post
  const { readingCount, favoritesCount, commentsCount, score: sc } = statistics
  const { textHtml, imageUrl: leadImage } = leadData
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
      to: '/post/' + id + '/comments',
    },
  ]
  const imageURLRegEx = /<img[^>]+src="?([^"\s]+)"?\s*/g
  const imageURLRegExResults = imageURLRegEx.exec(textHtml)
  const postFisrtImage = imageURLRegExResults
    ? imageURLRegExResults[1]
    : leadImage
  const classes = useStyles(!!postFisrtImage)
  const isCorporative = post.isCorporative
  const companyAlias = isCorporative
    ? post.hubs.find((e) => e.type === 'corporative').alias
    : null

  // Return troll text for hidden post
  if (
    hiddenAuthors.some((e) => e === login) ||
    (post.isCorporative && hiddenCompanies.some((e) => e === companyAlias))
  )
    return (
      <Paper
        style={{ padding: 16, display: 'flex' }}
        elevation={0}
        className={classes.paper}
      >
        <Typography className={classes.trollText}>Тут был тролль</Typography>
        <Link
          className={classes.trollLink}
          to={'/post/' + id}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Typography className={classes.trollLink}>
            всё равно читать
          </Typography>
          <RightIcon />
        </Link>
      </Paper>
    )

  return (
    <Paper elevation={0} className={classes.paper} style={style}>
      <Grid container>
        <Link to={'/user/' + login} className={classes.avatarContainer}>
          <Grid alignItems="center" container direction="row">
            <UserAvatar
              src={avatarUrl}
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
          <Link style={{ display: 'flex', width: '100%' }} to={'/post/' + id}>
            {postFisrtImage && (
              <LazyLoadImage
                src={postFisrtImage}
                alt={'Post header image'}
                className={classes.image}
              />
            )}
          </Link>
        </Grid>
        <div style={{ paddingTop: 0 }} className={classes.padding}>
          <Grid item xs={12}>
            <Link
              className={classes.postLink + ' ' + classes.noDeco}
              to={'/post/' + id}
            >
              <Typography className={classes.postTitle}>{title}</Typography>
            </Link>
          </Grid>
          <Grid item xs={12}>
            {post.postLabels.map((e, i) => (
              <Chip
                label={postLabels[e].text}
                variant="outlined"
                color="primary"
                size="small"
                key={i}
                style={{ marginRight: 8, marginTop: 8 }}
              />
            ))}
          </Grid>
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

export default React.memo(PostItem)
