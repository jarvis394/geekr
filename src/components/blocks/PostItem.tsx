import * as React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown'
import VisibilityIcon from '@material-ui/icons/Visibility'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'
import { CircularProgress } from '@material-ui/core'
import { makeStyles, darken, lighten } from '@material-ui/core/styles'
import formatNumber from 'src/utils/formatNumber'
import GreenRedNumber from 'src/components/formatters/GreenRedNumber'
import dayjs from 'dayjs'
import parse from 'html-react-parser'
import { Post } from 'src/interfaces'
import UserAvatar from './UserAvatar'
import {
  DEFAULT_POST_ITEM_HEIGHT,
  MIN_WIDTH,
  POST_IMAGE_HEIGHT,
  POST_ITEM_VISIBILITY_THRESHOLD,
} from 'src/config/constants'
import LazyLoadImage from './LazyLoadImage'
import { useSelector } from 'src/hooks'
import RightIcon from '@material-ui/icons/ChevronRightRounded'
import { Button, Chip, fade, Theme } from '@material-ui/core'
import { POST_LABELS } from 'src/config/constants'
import getPostLink from 'src/utils/getPostLink'
import VisibilitySensor from 'react-visibility-sensor'
import { useLocation, useHistory } from 'react-router-dom'
import OutsidePageLocationState from 'src/interfaces/OutsidePageLocationState'
import LinkToOutsidePage from './LinkToOutsidePage'
import isDarkTheme from 'src/utils/isDarkTheme'
import FormattedText from '../formatters/FormattedText'
import getImagesFromText from 'src/utils/getImagesFromText'
import { useSnackbar } from 'notistack'
import setArticleBookmark from 'src/api/setArticleBookmark'
import { useEffect } from 'react'

const ld = (theme: Theme) => (isDarkTheme(theme) ? darken : lighten)
const useStyles = makeStyles<
  Theme,
  {
    hasImage: boolean
    isExtended: boolean
  }
>((theme) => ({
  noDeco: {
    textDecoration: 'none !important',
  },
  placeholder: {
    height: DEFAULT_POST_ITEM_HEIGHT,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    marginBottom: 12,
    [theme.breakpoints.up(MIN_WIDTH)]: {
      borderRadius: 8,
    },
  },
  leadText: {
    padding: theme.spacing(0, 2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  postLink: {
    color: theme.palette.text.primary,
    '&:visited': {
      color: ld(theme)(theme.palette.text.primary, 0.4),
    },
    padding: theme.spacing(0, 2),
    fontWeight: 800,
    fontFamily: '"Google Sans"',
    fontSize: 20,
    marginTop: ({ hasImage }) => (hasImage ? 0 : theme.spacing(1)),
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
    [theme.breakpoints.up(MIN_WIDTH)]: {
      borderRadius: 8,
    },
  },
  padding: {
    padding: theme.spacing(2),
  },
  imageHolder: {
    maxWidth: '100%',
    width: '100%',
    display: 'flex',
    height: ({ hasImage }) => (hasImage ? POST_IMAGE_HEIGHT : '100%'),
    marginBottom: ({ hasImage }) => (hasImage ? theme.spacing(2) : 0),
    background: theme.palette.action.hover,
  },
  image: {
    maxWidth: '100%',
    height: '100%',
    objectFit: 'cover',
    width: '100vw',
  },
  leadImageWrapper: {
    marginBottom: theme.spacing(2),
    maxHeight: 500,
    objectFit: 'cover',
    paddingBottom: '56.4103%',
    position: 'relative',
    width: '100%',
  },
  leadImage: {
    maxWidth: '100%',
    height: '100%',
    borderRadius: 4,
    position: 'absolute',
    objectFit: 'cover',
    width: '100%',
    objectPosition: '0% 0%',
  },
  leadButton: {
    textTransform: 'none',
    borderRadius: 6,
    marginTop: theme.spacing(2),
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
    borderRadius: 4,
  },
  postBottomRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    [theme.breakpoints.up(765)]: {
      maxWidth: 400,
    },
  },
  postBottomRowItem: {
    color: theme.palette.text.hint,
    textDecoration: 'none',
    padding: ({ hasImage }) => theme.spacing(hasImage ? 2 : 1.5, 0, 2, 0),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    '-webkit-tap-highlight-color': fade(theme.palette.background.paper, 0.3),
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
    paddingBottom: ({ hasImage, isExtended }) => {
      if (isExtended) return theme.spacing(1)
      else if (hasImage) return theme.spacing(2)
      else return 0
    },
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
    display: 'flex',
    alignItems: 'center',
  },
  labelsContainer: {
    padding: theme.spacing(0, 2),
  },
  postTypeVoice: {
    color: theme.palette.error.light,
    marginBottom: theme.spacing(1),
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  },
  hubs: {
    wordBreak: 'break-word',
    marginBottom: theme.spacing(0.5),
    padding: theme.spacing(0, 2),
  },
  hubLink: {
    color: theme.palette.text.hint,
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontSize: 13,
    transitionDuration: '100ms',
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.primary.light,
    },
    ...theme.typography.body2,
  },
  hubWrapper: {
    color: theme.palette.text.hint,
    '&::after': {
      content: '",\u2004"',
    },
    '&:last-child::after': {
      content: '""',
    },
  },
}))

interface BottomRowItemType {
  icon: JSX.Element
  text: string | number
  coloredText?: boolean
  number?: number
  isActive?: boolean
  action?: () => void
}

export const PostItem = ({
  post,
  style,
  hideImage: hideImageProp = false,
  setPostItemSize,
  getPostItemSize = () => DEFAULT_POST_ITEM_HEIGHT,
}: {
  post?: Post
  style?: Record<string, unknown>
  hideImage?: boolean
  setPostItemSize?: (id: number | string, size: number) => void
  getPostItemSize?: (id?: number | string) => number
}) => {
  const isExtended = useSelector(
    (store) => !store.settings.interfaceFeed.isCompact
  )
  const disablePostImage = useSelector(
    (store) => store.settings.interfaceFeed.disablePostImage
  )
  const hideImage = hideImageProp || disablePostImage
  const { enqueueSnackbar } = useSnackbar()
  const { titleHtml: unparsedTitle, statistics, postFirstImage, leadData } =
    post || {}
  const hasImagesInLeadText = !!getImagesFromText(leadData.textHtml)
  const classes = useStyles({
    hasImage: (!!postFirstImage || hasImagesInLeadText) && !hideImage,
    isExtended,
  })

  /**
   * Post with postType 'voice' needs just a title to be shown.
   * Example: https://habr.com/ru/search/?q=%D1%81%D0%B8%D1%81#h
   * */
  if (post.postType === 'voice') {
    return (
      <Paper elevation={0} className={classes.paper} style={style}>
        <Typography
          className={[
            classes.postLink,
            classes.noDeco,
            classes.postTypeVoice,
          ].join(' ')}
        >
          {leadData.textHtml}
        </Typography>
      </Paper>
    )
  }

  const hiddenAuthors = useSelector((state) => state.settings.hiddenAuthors)
  const hiddenCompanies = useSelector((state) => state.settings.hiddenCompanies)
  const postBookmarked = post?.relatedData?.bookmarked
  const [isBookmarked, setBookmarkState] = React.useState<boolean>(
    postBookmarked
  )
  const [
    isFetchingBookmarkResponse,
    setIsFetchingBookmarkResponse,
  ] = React.useState(false)
  const [isRendered, setIsRendered] = React.useState(false)
  const history = useHistory<OutsidePageLocationState>()
  const location = useLocation()
  const currentLocation = location.pathname
  const ts = dayjs(post.timePublished).calendar().toLowerCase()
  const { alias, avatarUrl } = post.author
  const {
    readingCount,
    favoritesCount,
    commentsCount,
    score: unformattedScore,
  } = statistics
  const score = formatNumber(unformattedScore)
  const title = parse(unparsedTitle)
  const reads = formatNumber(readingCount)
  let favoritesCountAddAmount = 0
  if (postBookmarked) {
    favoritesCountAddAmount = isBookmarked ? 0 : -1
  } else {
    favoritesCountAddAmount = isBookmarked ? 1 : 0
  }
  const favorites = formatNumber(favoritesCount + favoritesCountAddAmount)
  const comments = formatNumber(Number(commentsCount))
  const isCorporative = post.isCorporative
  const companyAlias = isCorporative
    ? post.hubs.find((e) => e.type === 'corporative').alias
    : null
  const authData = useSelector((store) => store.auth.authData.data)
  const authorizedRequestData = useSelector(
    (store) => store.auth.authorizedRequestData
  )
  const rootRef = React.useRef<HTMLDivElement>()
  const placeholderStyles = React.useMemo(() => ({ height: getPostItemSize(post.id) }), [getPostItemSize])
  const postLink = getPostLink(post)
  const shouldShowPostImage = postFirstImage && !hideImage && !isExtended
  const bottomRow: BottomRowItemType[] = [
    {
      icon: <ThumbsUpDownIcon className={classes.postBottomRowItemIcon} />,
      text: score,
      coloredText: true,
      number: unformattedScore,
    },
    {
      icon: <VisibilityIcon className={classes.postBottomRowItemIcon} />,
      text: reads,
    },
    {
      icon: isFetchingBookmarkResponse ? (
        <CircularProgress
          className={classes.postBottomRowItemIcon}
          style={{ width: 16, height: 16 }}
          thickness={5}
        />
      ) : (
        <BookmarkIcon
          className={classes.postBottomRowItemIcon}
          color={isBookmarked ? 'primary' : 'inherit'}
        />
      ),
      text: favorites,
      isActive: isBookmarked,
      action: async () => {
        if (authData) {
          setIsFetchingBookmarkResponse(true)
          const response = await setArticleBookmark({
            mode: isBookmarked ? 'remove' : 'add',
            authData: authorizedRequestData,
            id: post.id,
          })
          if (response.ok) {
            setBookmarkState((prev) => !prev)
            setIsFetchingBookmarkResponse(false)
          }
        } else {
          enqueueSnackbar('Нужна авторизация', {
            variant: 'error',
            autoHideDuration: 4000,
          })
        }
      },
    },
    {
      icon: <ChatBubbleIcon className={classes.postBottomRowItemIcon} />,
      text: comments,
      action: () => {
        history.push(postLink + '/comments', {
          from: currentLocation,
          scroll: window.pageYOffset,
        })
      },
    },
  ]

  // Return troll text for hidden post
  if (
    hiddenAuthors.includes(alias) ||
    (isCorporative && hiddenCompanies.includes(companyAlias))
  )
    return (
      <Paper
        style={{ padding: 16, display: 'flex', flexDirection: 'row' }}
        elevation={0}
        className={classes.paper}
      >
        <Typography className={classes.trollText}>Тут был тролль</Typography>
        <LinkToOutsidePage className={classes.trollLink} to={postLink}>
          <Typography className={classes.trollLink}>
            всё равно читать
          </Typography>
          <RightIcon />
        </LinkToOutsidePage>
      </Paper>
    )

  const BottomRowItemUnmemoized = ({ item }: { item: BottomRowItemType }) => {
    const itemIcon = item.icon
    return (
      <Grid
        xs={3}
        item
        onClick={item.action}
        style={{
          cursor: item.action ? 'pointer' : 'inherit',
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
            <Typography
              className={classes.postBottomRowItemText}
              color={item.isActive ? 'primary' : 'initial'}
            >
              {item.text}
            </Typography>
          </>
        )}
      </Grid>
    )
  }
  const BottomRowItem = React.memo(BottomRowItemUnmemoized)

  useEffect(() => {
    if (setPostItemSize && isRendered && rootRef.current) {
      setPostItemSize(post.id, rootRef.current.getBoundingClientRect().height)
    }
  }, [isRendered])

  return (
    <VisibilitySensor
      partialVisibility
      offset={{
        top: POST_ITEM_VISIBILITY_THRESHOLD,
        bottom: POST_ITEM_VISIBILITY_THRESHOLD,
      }}
      active={!isRendered}
      onChange={(newIsVisible) => setIsRendered(newIsVisible)}
    >
      {({ isVisible }) => (
        <>
          {!isVisible && (
            <div
              style={placeholderStyles}
              className={classes.placeholder}
            />
          )}
          {isVisible && (
            <Paper
              ref={rootRef}
              elevation={0}
              className={classes.paper}
              style={style}
            >
              <LinkToOutsidePage
                to={'/user/' + alias}
                className={classes.avatarContainer}
              >
                <UserAvatar
                  src={avatarUrl}
                  alias={alias}
                  className={classes.postAvatar}
                />
                <Typography className={classes.postAuthor} variant="caption">
                  {alias}
                </Typography>
                <Typography className={classes.postTs} variant="caption">
                  {ts}
                </Typography>
              </LinkToOutsidePage>
              {shouldShowPostImage && (
                <LinkToOutsidePage
                  className={classes.imageHolder}
                  to={postLink}
                >
                  <LazyLoadImage
                    src={postFirstImage}
                    alt={'Post header image'}
                    className={classes.image}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </LinkToOutsidePage>
              )}

              <LinkToOutsidePage
                className={[classes.postLink, classes.noDeco].join(' ')}
                to={postLink}
              >
                {title}
              </LinkToOutsidePage>

              {/** Post hubs */}
              {isExtended && (
                <div className={classes.hubs}>
                  {post.hubs.map((hub, i) => (
                    <span key={i} className={classes.hubWrapper}>
                      <LinkToOutsidePage
                        className={classes.hubLink}
                        to={'/hub/' + hub.alias + '/p/1'}
                      >
                        {hub.title}
                      </LinkToOutsidePage>
                    </span>
                  ))}
                </div>
              )}

              {/** Post labels */}
              <div className={classes.labelsContainer}>
                {post.postLabels.map(
                  (e, i) =>
                    POST_LABELS[e.type] && (
                      <Chip
                        label={POST_LABELS[e.type]?.text}
                        variant="outlined"
                        color="primary"
                        size="small"
                        key={i}
                        style={{ marginRight: 8, marginTop: 8 }}
                      />
                    )
                )}
              </div>

              {isExtended && (
                <div className={classes.leadText}>
                  {!hasImagesInLeadText && postFirstImage && (
                    <div className={classes.leadImageWrapper}>
                      <img
                        src={postFirstImage}
                        alt={'Post header image'}
                        className={classes.leadImage}
                      />
                    </div>
                  )}
                  <FormattedText>{leadData.textHtml}</FormattedText>
                  <LinkToOutsidePage to={postLink} className={classes.link}>
                    <Button
                      color="primary"
                      className={classes.leadButton}
                      variant={'outlined'}
                    >
                      {parse(leadData.buttonTextHtml)}
                    </Button>
                  </LinkToOutsidePage>
                </div>
              )}

              <div className={classes.postBottomRow}>
                {bottomRow.map((e, i) => (
                  <BottomRowItem item={e} key={i} />
                ))}
              </div>
            </Paper>
          )}
        </>
      )}
    </VisibilitySensor>
  )
}

export default React.memo(PostItem)
