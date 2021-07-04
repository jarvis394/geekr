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
import Statistics from './Statistics'
import SimilarPosts from './SimilarPosts'
import TopDayPosts from './TopDayPosts'
import { Chip, Link as MUILink } from '@material-ui/core'
import { MIN_WIDTH, POST_LABELS as postLabels } from 'src/config/constants'
import OutsidePage from 'src/components/blocks/OutsidePage'
import { useSelector } from 'src/hooks'
import { useDispatch } from 'react-redux'
import PostLocationState from 'src/interfaces/PostLocationState'
import getContrastPaperColor from 'src/utils/getContrastPaperColor'
import GreenRedNumber from 'src/components/formatters/GreenRedNumber'
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown'
import MetaTags from 'react-meta-tags'
import getPostLink from 'src/utils/getPostLink'
import getPostSocialImage from 'src/utils/getPostSocialImage'
import formatLdJsonSchema from 'src/utils/formatLdJsonSchema'
import MainBlock from 'src/components/blocks/MainBlock'
import Sidebar from 'src/components/blocks/Sidebar'
import SideBlock from 'src/components/blocks/SideBlock'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    backgroundColor: getContrastPaperColor(theme),
    paddingBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
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
    flexGrow: 1,
  },
  score: {
    fontWeight: 700,
    fontSize: 13,
    marginLeft: theme.spacing(1),
  },
  scoreIcon: {
    fontSize: '1rem',
  },
  scoreWrapper: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.secondary,
  },
  text: {
    marginTop: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    lineHeight: '1.56',
    wordBreak: 'break-word',
    hyphens: 'auto',
    color: theme.palette.text.primary,
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
  content: {
    [theme.breakpoints.up(MIN_WIDTH)]: {
      paddingBottom: theme.spacing(1),
      borderRadius: 8,
      backgroundColor: theme.palette.background.paper + ' !important',
      marginTop: theme.spacing(1.5),
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
      const labelData = postLabels[e.type]
      return (
        <Chip
          label={labelData.text}
          variant="outlined"
          color="primary"
          size="small"
          key={i}
          component={labelData.link ? MUILink : 'span'}
          style={{ marginRight: 8, marginTop: 8 }}
        />
      )
    })
  const contents = shouldShowContents ? (
    <>
      {/** Company header */}
      {company && company?.settings?.branding?.imageUrl && (
        <div className={classes.companyHeaderLink}>
          <a
            style={{ display: 'flex' }}
            href={company.settings.branding.linkUrl}
          >
            <img
              alt={company.alias}
              className={classes.companyHeader}
              src={company.settings.branding.imageUrl}
            />
          </a>
        </div>
      )}

      <Container>
        {/** Post header */}
        <Grid
          className={classes.authorBar}
          container
          direction="row"
          alignItems="center"
        >
          <UserAvatar
            alias={post.author.alias}
            src={post.author.avatarUrl}
            className={classes.avatar}
          />
          <Typography
            component={Link}
            to={'/user/' + post.author.alias}
            className={classes.author}
          >
            {post.author.alias}
          </Typography>
          <Typography className={classes.ts}>
            {dayjs(post.timePublished).fromNow()}
          </Typography>
          <GreenRedNumber
            number={post.statistics.score}
            wrapperProps={{ className: classes.scoreWrapper }}
          >
            <>
              <ThumbsUpDownIcon className={classes.scoreIcon} />
              <Typography className={classes.score}>
                {post.statistics.score > 0 ? '+' : ''}
                {post.statistics.score}
              </Typography>
            </>
          </GreenRedNumber>
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
  }, [dispatch, id, companyAlias, offset])

  if (fetchError) return <ErrorComponent message={fetchError} />
  if (companyFetchError)
    console.error('Could not fetch company data:', companyFetchError)

  return (
    <OutsidePage headerText={post?.titleHtml}>
      <MetaTags>
        <title>{(post ? post.titleHtml : 'Публикация') + ' | habra.'}</title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@habrahabr" />
        <meta name="twitter:title" content={post?.titleHtml} />
        <meta name="description" content={post?.metadata.metaDescription} />
        <meta itemProp="description" content={post?.metadata.metaDescription} />
        <meta
          property="og:description"
          content={post?.metadata.metaDescription}
        />
        <meta
          property="aiturec:description"
          content={post?.metadata.metaDescription}
        />
        <meta
          name="twitter:description"
          content={post?.metadata.metaDescription}
        />
        <meta itemProp="image" content={getPostSocialImage(post)} />
        <meta property="og:image" content={getPostSocialImage(post)} />
        <meta property="vk:image" content={getPostSocialImage(post)} />
        <meta name="twitter:image" content={getPostSocialImage(post)} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={process.env.PUBLIC_URL + getPostLink(post)}
        />
        <meta itemProp="name" content={post?.titleHtml} />
        <meta property="og:title" content={post?.titleHtml} />
        <meta property="aiturec:title" content={post?.titleHtml} />
        <meta property="aiturec:item_id" content={post?.id.toString()} />
        <meta property="aiturec:datetime" content={post?.timePublished} />
        <script type="application/ld+json">{formatLdJsonSchema(post)}</script>
      </MetaTags>

      <MainBlock>
        <div className={classes.root}>
          <div className={classes.content}>{contents}</div>

          {/* Bottom bar with some article info */}
          {post && <Statistics post={post} />}

          {/* Similar */}
          <SimilarPosts id={id} />

          {/* Top day */}
          <TopDayPosts />
        </div>
      </MainBlock>
      <Sidebar>
        <SideBlock title={'asd'}></SideBlock>
      </Sidebar>
    </OutsidePage>
  )
}

export default React.memo(Post)
