import React from 'react'
import { Grid, Paper, Typography } from '@material-ui/core'
import { alpha, makeStyles, lighten, darken } from '@material-ui/core/styles'
import LinkToOutsidePage from 'src/components/blocks/LinkToOutsidePage'
import GreenRedNumber from 'src/components/formatters/GreenRedNumber'
import dayjs from 'dayjs'
import parse from 'html-react-parser'
import { useHistory, useLocation } from 'react-router'
import OutsidePageLocationState from 'src/interfaces/OutsidePageLocationState'
import formatNumber from 'src/utils/formatNumber'
import getPostLink from 'src/utils/getPostLink'
import { Post } from 'src/interfaces'
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown'
import VisibilityIcon from '@material-ui/icons/Visibility'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'

const ld = { lighten, darken }
const useStyles = makeStyles((theme) => ({
  noDeco: {
    textDecoration: 'none !important',
  },
  postLink: {
    color: theme.palette.text.primary,
    '&:visited > p': {
      // TODO: fix types
      //@ts-expect-error
      color: ld[theme.palette.type + 'en'](theme.palette.text.primary, 0.4),
    },
    fontWeight: 800,
    fontFamily: '"Google Sans"',
    fontSize: 16,
    marginTop: (hasImage) => (hasImage ? 0 : theme.spacing(1)),
    '& .searched-item': {
      color: theme.palette.primary.light, // Highlight the search query in post's title
    },
  },
  paper: {
    background: 'transparent',
    borderRadius: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  postTs: {
    color: theme.palette.text.hint,
    flexGrow: 1,
    marginBottom: theme.spacing(0.75),
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
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    '-webkit-tap-highlight-color': alpha(theme.palette.background.paper, 0.3),
  },
  postBottomRowItemIcon: {
    fontSize: 16,
    marginRight: theme.spacing(1),
  },
  postBottomRowItemText: {
    fontSize: 13,
    fontWeight: 600,
  },
}))

interface BottomRowItemType {
  icon: typeof ThumbsUpDownIcon
  text: string | number
  coloredText?: boolean
  number?: number
  isActive?: boolean
  action?: () => void
}

const DensePostItem = ({
  post,
  className,
}: {
  post?: Post
  className?: string
}) => {
  if (!post) return

  const classes = useStyles()
  const [isBookmarked, setBookmarkState] = React.useState<boolean>()
  const { titleHtml: unparsedTitle, statistics } = post || {}
  const history = useHistory<OutsidePageLocationState>()
  const location = useLocation()
  const currentLocation = location.pathname
  const ts = dayjs(post?.timePublished)
    .calendar()
    .toLowerCase()
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
      action: () => {
        history.push(postLink + '/comments', {
          from: currentLocation,
          scroll: window.pageYOffset,
        })
      },
    },
  ]

  const BottomRowItem = ({ item }: { item: BottomRowItemType }) => {
    const itemIcon = (
      <item.icon
        className={classes.postBottomRowItemIcon}
        color={item.isActive ? 'primary' : 'inherit'}
      />
    )
    return (
      <Grid
        xs={3}
        item
        onClick={item.action}
        color={item.isActive ? 'primary' : 'default'}
        style={{
          cursor: item.action ? 'pointer' : 'inherit',
        }}
        className={classes.postBottomRowItem}
      >
        {item.coloredText ? (
          <GreenRedNumber
            number={item.number || 0}
            wrapperProps={{ style: { display: 'flex', alignItems: 'center' } }}
          >
            <>
              {itemIcon}
              <Typography className={classes.postBottomRowItemText}>
                {(item.number || 0) > 0 ? '+' : ''}
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
    <Paper elevation={0} className={classes.paper + ' ' + className}>
      <Typography className={classes.postTs} variant="caption">
        {ts}
      </Typography>

      <LinkToOutsidePage
        className={classes.postLink + ' ' + classes.noDeco}
        to={postLink}
      >
        {title}
      </LinkToOutsidePage>

      <div className={classes.postBottomRow}>
        {bottomRow.map((e, i) => (
          <BottomRowItem item={e} key={i} />
        ))}
      </div>
    </Paper>
  )
}

export default React.memo(DensePostItem)
