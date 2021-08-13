import * as React from 'react'
import { useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { fade, makeStyles, darken, lighten } from '@material-ui/core/styles'
import { useParams } from 'react-router'
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
import {
  Chip,
  Fade,
  Link as MUILink,
} from '@material-ui/core'
import { MIN_WIDTH, POST_LABELS as postLabels } from 'src/config/constants'
import OutsidePage from 'src/components/blocks/OutsidePage'
import { useSelector } from 'src/hooks'
import { useDispatch } from 'react-redux'
import getContrastPaperColor from 'src/utils/getContrastPaperColor'
import GreenRedNumber from 'src/components/formatters/GreenRedNumber'
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown'
import MetaTags from 'react-meta-tags'
import getPostLink from 'src/utils/getPostLink'
import getPostSocialImage from 'src/utils/getPostSocialImage'
import formatLdJsonSchema from 'src/utils/formatLdJsonSchema'
import MainBlock from 'src/components/blocks/MainBlock'
import PostSidebar from './Sidebar'
import { HubsItem } from '../User/Hubs'
import { Hub } from 'src/interfaces'
import AuthorCard from './AuthorCard'
import CompanyCard from './CompanyCard'
import CompanyCardWithLinks from './CompanyCardWithLinks'

const makeGradient = (theme: Theme) => {
  const t =
    theme.palette.type === 'light'
      ? lighten(theme.palette.background.default, 0.1)
      : darken(theme.palette.background.paper, 0.1)
  const colors = [
    t,
    fade(t, 0.98),
    fade(t, 0.94),
    fade(t, 0.88),
    fade(t, 0.8),
    fade(t, 0.71),
    fade(t, 0.61),
    fade(t, 0.5),
    fade(t, 0.39),
    fade(t, 0.29),
    fade(t, 0.2),
    fade(t, 0.12),
    fade(t, 0.06),
    fade(t, 0.02),
    fade(t, 0),
  ]

  return `linear-gradient(to bottom, ${colors.join(',')})`
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
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
  authorBar: { paddingTop: theme.spacing(2) },
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
    paddingBottom: theme.spacing(1),
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
    paddingBottom: theme.spacing(1.5),
    backgroundColor: getContrastPaperColor(theme),
    [theme.breakpoints.up(MIN_WIDTH)]: {
      borderRadius: 8,
      backgroundColor: theme.palette.background.paper + ' !important',
      marginTop: theme.spacing(1.5),
    },
  },
  sectionTitle: {
    fontFamily: 'Google Sans',
    textTransform: 'uppercase',
    fontWeight: 500,
    fontSize: 13,
    letterSpacing: '1px',
    color: theme.palette.text.hint,
    lineHeight: 'normal',
    padding: theme.spacing(0.5, 0),
  },
  section: {
    padding: theme.spacing(1.8 / 2, 0),
  },
  sectionLinkWrapper: {
    '&::after': {
      content: '",\u2004"',
    },
    '&:last-child::after': {
      content: '""',
    },
    color: theme.palette.primary.main,
  },
  sectionLink: {
    color: theme.palette.primary.main,
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontSize: 13,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
    ...theme.typography.body2,
  },
  hubsContainer: {
    marginTop: theme.spacing(0.5),
  },
  postHeader: {
    background: makeGradient(theme),
    [theme.breakpoints.up(MIN_WIDTH)]: {
      background: 'transparent',
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
  const contentsRef = React.useRef<HTMLDivElement>()
  const isTranslated = post && !!post.translationData
  const shouldShowContents = post && (companyAlias ? post && company : post)
  const shouldShowCompanyInfo = !!company
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
      {/** Post header */}
      <Fade in>
        <div className={classes.postHeader}>
          <Container>
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
                  <Link
                    className={classes.hubLink}
                    to={'/hub/' + hub.alias + '/p/1'}
                  >
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
          </Container>
        </div>
      </Fade>

      {/* Article text */}
      <Fade in>
        <Container>
          <FormattedText
            className={classes.text}
            oldHabrFormat={post.editorVersion === '1.0'}
          >
            {post.textHtml}
          </FormattedText>

          <div className={classes.section}>
            <Typography className={classes.sectionTitle}>Теги</Typography>
            {post.tags.map((e, i) => (
              <span key={i} className={classes.sectionLinkWrapper}>
                <Link
                  to={`/search/p/1?q=[${e.titleHtml}]`}
                  className={classes.sectionLink}
                >
                  {e.titleHtml}
                </Link>
              </span>
            ))}
          </div>
          <div className={classes.section}>
            <Typography className={classes.sectionTitle}>Хабы</Typography>
            <Grid spacing={1} container className={classes.hubsContainer}>
              {post.hubs.map((e, i) => (
                <HubsItem data={(e as unknown) as Hub} key={i} />
              ))}
            </Grid>
          </div>
        </Container>
      </Fade>
    </>
  ) : (
    <PostViewSkeleton />
  )

  // Start fetching post data
  useEffect(() => {
    dispatch(getPost(id))
    companyAlias && dispatch(getCompany(companyAlias))
  }, [id, companyAlias])

  if (fetchError) return <ErrorComponent message={fetchError} />
  if (companyFetchError)
    console.error('Could not fetch company data:', companyFetchError)
  
  return (
    <OutsidePage hidePositionBar={!shouldShowContents} headerText={post?.titleHtml} scrollElement={contentsRef.current}>
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
        {/* <meta itemProp="image" content={getPostSocialImage(post)} />
        <meta property="og:image" content={getPostSocialImage(post)} />
        <meta property="vk:image" content={getPostSocialImage(post)} />
        <meta name="twitter:image" content={getPostSocialImage(post)} /> */}
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
          {/** Company header */}
          <CompanyCard post={post} companyAlias={companyAlias} />

          <div className={classes.content} ref={contentsRef}>{contents}</div>

          {/* Bottom bar with some article info */}
          {post && <Statistics post={post} />}
          {shouldShowCompanyInfo && <CompanyCardWithLinks post={post} />}
          <AuthorCard post={post} />
          <SimilarPosts id={id} />
          <TopDayPosts />
        </div>
      </MainBlock>
      <PostSidebar />
    </OutsidePage>
  )
}

export default React.memo(Post)
