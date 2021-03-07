import * as React from 'react'
import { useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { fade, makeStyles } from '@material-ui/core/styles'
import { useLocation, useParams } from 'react-router'
import { getPost, getCompany } from 'src/store/actions/post'
import { Link } from 'react-router-dom'
import PostViewSkeleton from 'src/components/skeletons/PostView'
import ErrorComponent from 'src/components/blocks/Error'
import dayjs from 'dayjs'
import FormattedText from 'src/components/formatters/FormattedText'
import { Theme } from '@material-ui/core/styles'
import UserAvatar from 'src/components/blocks/UserAvatar'
import BottomBar from './BottomBar'
import SimilarPosts from './SimilarPosts'
import TopDayPosts from './TopDayPosts'
import { Chip, Link as MUILink } from '@material-ui/core'
import {
  chromeAddressBarHeight,
  POST_LABELS as postLabels,
} from 'src/config/constants'
import OutsidePage from 'src/components/blocks/OutsidePage'
import { useSelector } from 'src/hooks'
import { useDispatch } from 'react-redux'
import { setPostReadingProgress } from 'src/store/actions/post'
import isMobile from 'is-mobile'
import PostLocationState from 'src/interfaces/PostLocationState'
import isDarkTheme from 'src/utils/isDarkTheme'
import getContrastPaperColor from 'src/utils/getContrastPaperColor'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    maxWidth: '100vw',
    backgroundColor: getContrastPaperColor(theme),
    paddingBottom: theme.spacing(2),
  },
  hubs: {
    wordBreak: 'break-word',
    width: '100%',
    marginBottom: theme.spacing(0.5),
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
  post: {
    background: getContrastPaperColor(theme),
  },
  authorBar: { paddingTop: theme.spacing(2.5) },
  avatar: {
    width: theme.spacing(2.5),
    height: theme.spacing(2.5),
    marginRight: theme.spacing(1),
    borderRadius: 2,
  },
  author: {
    color: theme.palette.primary.light,
    marginRight: theme.spacing(1),
    fontWeight: 700,
    fontSize: 13,
    textDecoration: 'none',
  },
  ts: {
    color: theme.palette.text.hint,
    fontWeight: 400,
    fontSize: 13,
  },
  text: {
    marginTop: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    lineHeight: '1.56',
    wordBreak: 'break-word',
    hyphens: 'auto',
    color: isDarkTheme(theme) ? '#eee' : theme.palette.text.primary,
  },
  title: {
    fontWeight: 800,
    fontFamily: 'Google Sans',
    fontSize: 24,
    lineHeight: '32px',
    wordBreak: 'break-word',
    hyphens: 'auto',
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1.5),
  },
  commentsButton: {
    marginTop: theme.spacing(2),
  },
  companyHeaderLink: {
    display: 'flex',
    background: getContrastPaperColor(theme),
    flexDirection: 'column',
  },
  companyHeader: {
    width: '100%',
  },
  translatedBox: {
    backgroundColor: fade(theme.palette.primary.dark, 0.1),
    padding: theme.spacing(1, 2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    display: 'flex',
    fontSize: 14,
    borderRadius: 2,
    '-webkit-tap-highlight-color': 'transparent !important',
    textDecoration: 'none !important',
    '&:active': {
      opacity: 0.9,
    },
  },
}))

interface Params {
  id: string
  alias?: string
}

const Post = () => {
  const dispatch = useDispatch()
  const company = useSelector((store) => store.post.company.data)
  const companyFetchError = useSelector(
    (store) => store.post.company.fetchError
  )
  const post = useSelector((store) => store.post.post.data)
  const fetchError = useSelector((store) => store.post.post.fetchError)
  const { id: strigifiedId, alias: companyAlias } = useParams<Params>()
  const id = Number(strigifiedId)
  const classes = useStyles()
  const isTranslated = post && !!post.translationData
  const shouldShowContents = post && (companyAlias ? post && company : post)
  const location = useLocation<PostLocationState>()
  const offset = location.state ? location.state.offset : 0
  const labels =
    shouldShowContents &&
    post.postLabels.map((e, i) => {
      const labelData = postLabels[e]
      const chip = (
        <Chip
          label={labelData.text}
          variant="outlined"
          color="primary"
          size="small"
          key={i}
          style={{ marginRight: 8, marginTop: 8 }}
        />
      )
      return labelData.link ? (
        <MUILink href={labelData.link}>{chip}</MUILink>
      ) : (
        chip
      )
    })
  const contents = shouldShowContents ? (
    <>
      {/** Company header */}
      {company && company?.branding?.headerUrl && (
        <div className={classes.companyHeaderLink}>
          <a style={{ display: 'flex' }} href={company.branding.headerUrl}>
            <img
              alt={company.alias}
              className={classes.companyHeader}
              src={company.branding.headerImageUrl}
            />
          </a>
        </div>
      )}

      <Container className={classes.post}>
        {/** Post header */}
        <Grid
          className={classes.authorBar}
          container
          direction="row"
          alignItems="center"
        >
          <UserAvatar
            login={post.author.login}
            src={post.author.avatarUrl}
            className={classes.avatar}
          />
          <Typography
            component={Link}
            to={'/user/' + post.author.login}
            className={classes.author}
          >
            {post.author.login}
          </Typography>
          <Typography className={classes.ts}>
            {dayjs(post.timePublished).fromNow()}
          </Typography>
        </Grid>
        <Typography className={classes.title}>{post.titleHtml}</Typography>
        <div className={classes.hubs}>
          {post.hubs.map((hub, i) => (
            <span key={i} className={classes.hubWrapper}>
              <Link className={classes.hubLink} to={'/hub/' + hub.alias}>
                {hub.title}
              </Link>
            </span>
          ))}
        </div>
        {labels}
        {isTranslated && (
          <MUILink
            href={post.translationData.originalUrl}
            className={classes.translatedBox}
          >
            Автор оригинала: {post.translationData.originalAuthorName}
          </MUILink>
        )}

        {/* Article text */}
        <FormattedText
          className={classes.text}
          disableParagraphMargin={post.editorVersion === '1.0'}
        >
          {post.textHtml}
        </FormattedText>
      </Container>
    </>
  ) : (
    <PostViewSkeleton />
  )

  const getScrollProgress = () => {
    const position = window.pageYOffset
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight
    return Math.min(
      position / (windowHeight - (isMobile() ? chromeAddressBarHeight : 0)),
      1
    )
  }

  // Start fetching post data
  useEffect(() => {
    dispatch(getPost(id))
    companyAlias && dispatch(getCompany(companyAlias))

    if (offset !== 0 && post) {
      setImmediate(() =>
        window.scrollTo({
          top: offset,
          behavior: 'smooth',
        })
      )
    }

    // Write progress data to the store when the component unloads
    return () => {
      const progress = getScrollProgress()
      if (progress >= 0.15 && progress <= 0.8) {
        dispatch(
          setPostReadingProgress({
            post,
            progress,
            offset: window.pageYOffset,
          })
        )
      } else {
        dispatch(
          setPostReadingProgress({
            post: null,
            progress: null,
            offset: null,
          })
        )
      }
    }
  }, [dispatch, id, companyAlias, post, offset])

  if (post) document.title = post.titleHtml
  if (fetchError) return <ErrorComponent message={fetchError} />
  if (companyFetchError)
    console.error('Could not fetch company data:', companyFetchError)

  return (
    <OutsidePage headerText={post?.titleHtml}>
      <div className={classes.root}>
        {contents}

        {/* Bottom bar with some article info */}
        {post && <BottomBar post={post} />}

        {/* Similar */}
        <SimilarPosts id={id} />

        {/* Top day */}
        <TopDayPosts />
      </div>
    </OutsidePage>
  )
}

export default React.memo(Post)
