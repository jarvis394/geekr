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
import { LazyLoadComponent } from 'react-lazy-load-image-component'
import getPostLink from 'src/utils/getPostLink'

const ld = { lighten, darken }
const useStyles = makeStyles((theme) => ({
  noDeco: {
    textDecoration: 'none !important',
  },
  placeholder: {
    height: '390px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    marginBottom: 12,
  },
  postLink: {
    color: theme.palette.text.primary,
    '&:visited > p': {
      color: ld[theme.palette.type + 'en'](theme.palette.text.primary, 0.4),
    },
    padding: theme.spacing(0, 2),
    fontWeight: 800,
    fontFamily: '"Google Sans"',
    fontSize: 20,
    marginTop: (hasImage) => (hasImage ? 0 : theme.spacing(1)),
    '& .searched-item': {
      color: theme.palette.primary.light, // Highlight the search query in post's title
    },
  },
  paper: {
    background: theme.palette.background.paper,
    borderRadius: 0,
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(1.5),
  },
  padding: {
    padding: theme.spacing(2),
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
    width: '100vw',
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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  postBottomRowItem: {
    color: theme.palette.text.hint,
    textDecoration: 'none',
    padding: (hasImage) => theme.spacing(hasImage ? 2 : 1.5, 0, 2, 0),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
    fontWeight: 600,
  },
  postBottomRowItemIcon: {
    fontSize: 16,
    marginRight: theme.spacing(1),
  },
  postBottomRowItemText: {
    fontSize: 13,
    fontWeight: 600,
  },
  avatarContainer: {
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
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
  labelsContainer: {
    padding: theme.spacing(0, 2),
  },
}))

interface BottomRowItemType {
  icon: typeof ThumbsUpDownIcon
  text: string | number
  coloredText?: boolean
  number?: number
  to?: string
  isActive?: boolean
  action?: () => void
}

export const PostItem = ({
  post,
  style,
  hideImage,
}: {
  post?: Post
  style?: Record<string, unknown>
  hideImage?: boolean
}) => {
  const hiddenAuthors = useSelector((state) => state.settings.hiddenAuthors)
  const hiddenCompanies = useSelector((state) => state.settings.hiddenCompanies)
  const [isBookmarked, setBookmarkState] = React.useState<boolean>()
  const { titleHtml: unparsedTitle, statistics, postFirstImage } = post || {}
  const classes = useStyles(!!postFirstImage && !hideImage)

  const ts = dayjs(post.timePublished).calendar().toLowerCase()
  const { login, avatarUrl } = post.author
  const {
    readingCount,
    favoritesCount,
    commentsCount,
    score: unformattedScore,
  } = statistics
  const score = formatNumber(unformattedScore)
  const title = parse(unparsedTitle)
  const reads = formatNumber(readingCount)
  const favorites = formatNumber(favoritesCount + (isBookmarked ? 1 : 0))
  const comments = formatNumber(Number(commentsCount))
  const isCorporative = post.isCorporative
  const companyAlias = isCorporative
    ? post.hubs.find((e) => e.type === 'corporative').alias
    : null
  const postLink = getPostLink(post)
  const bottomRow: BottomRowItemType[] = [
    {
      icon: ThumbsUpDownIcon,
      text: score,
      coloredText: true,
      number: unformattedScore,
    },
    {
      icon: VisibilityIcon,
      text: reads,
    },
    {
      icon: BookmarkIcon,
      text: favorites,
      isActive: isBookmarked,
      action: () => {
        setBookmarkState((prev) => !prev)
      },
    },
    {
      icon: ChatBubbleIcon,
      text: comments,
      to: postLink + '/comments',
    },
  ]

  // Return troll text for hidden post
  if (
    hiddenAuthors.includes(login) ||
    (isCorporative && hiddenCompanies.includes(companyAlias))
  )
    return (
      <Paper
        style={{ padding: 16, display: 'flex', flexDirection: 'row' }}
        elevation={0}
        className={classes.paper}
      >
        <Typography className={classes.trollText}>Тут был тролль</Typography>
        <Link
          className={classes.trollLink}
          to={postLink}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Typography className={classes.trollLink}>
            всё равно читать
          </Typography>
          <RightIcon />
        </Link>
      </Paper>
    )

  const BottomRowItem = ({ item }: { item: BottomRowItemType }) => {
    const itemIcon = (
      <item.icon
        className={classes.postBottomRowItemIcon}
        color={item.isActive ? 'primary' : 'inherit'}
      />
    )
    return (
      <Grid
        component={item.to ? Link : Grid}
        xs={3}
        item
        to={item.to}
        onClick={item.action || null}
        color={item.isActive ? 'primary' : 'default'}
        style={{
          cursor: item.action || item.to ? 'pointer' : 'inherit',
        }}
        className={classes.postBottomRowItem}
      >
        {item.coloredText ? (
          <GreenRedNumber
            number={item.number}
            wrapperProps={{ style: { display: 'flex', alignItems: 'center' } }}
          >
            <>
              {itemIcon}
              <Typography className={classes.postBottomRowItemText}>
                {item.number > 0 ? '+' : ''}
                {item.text}
              </Typography>
            </>
          </GreenRedNumber>
        ) : (
          <>
            {itemIcon}
            <Typography className={classes.postBottomRowItemText}>
              {item.text}
            </Typography>
          </>
        )}
      </Grid>
    )
  }

  return (
    <LazyLoadComponent placeholder={<div className={classes.placeholder} />}>
      <Paper elevation={0} className={classes.paper} style={style}>
        <Link to={'/user/' + login} className={classes.avatarContainer}>
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
        </Link>
        {postFirstImage && !hideImage && (
          <Link className={classes.imageHolder} to={postLink}>
            <LazyLoadImage
              src={postFirstImage}
              alt={'Post header image'}
              className={classes.image}
            />
          </Link>
        )}

        <Link className={classes.postLink + ' ' + classes.noDeco} to={postLink}>
          {title}
        </Link>

        {/** Post labels */}
        <div className={classes.labelsContainer}>
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
        </div>

        <div className={classes.postBottomRow}>
          {bottomRow.map((e, i) => (
            <BottomRowItem item={e} key={i} />
          ))}
        </div>
      </Paper>
    </LazyLoadComponent>
  )
}

export default React.memo(PostItem)
