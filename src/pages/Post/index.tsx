import * as React from 'react'
import { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router'
import { getPost } from '../../api'
import { Link } from 'react-router-dom'
import PostViewSkeleton from '../../components/skeletons/PostView'
import ErrorComponent from '../../components/blocks/Error'
import dayjs from 'dayjs'
import FormattedText from '../../components/formatters/FormattedText'
import { Theme } from '@material-ui/core/styles'
import { Post as IPost, Company as ICompany } from 'src/interfaces'
import UserAvatar from 'src/components/blocks/UserAvatar'
import BottomBar from './BottomBar'
import CommentsButton from './CommentsButton'
import SimilarPosts from './SimilarPosts'
import TopDayPosts from './TopDayPosts'
import getCompany from 'src/api/getCompany'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    maxWidth: '100vw',
    backgroundColor: theme.palette.background.default,
  },
  hubs: {
    wordBreak: 'break-word',
    width: '100%',
    marginBottom: theme.spacing(3),
  },
  hubLink: {
    color: theme.palette.text.hint,
    fontWeight: 500,
    transitionDuration: '100ms',
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.primary.light,
    },
  },
  post: {
    background: theme.palette.background.paper,
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
    fontWeight: 500,
    fontSize: 14,
    textDecoration: 'none',
  },
  ts: {
    color: theme.palette.text.hint,
    fontWeight: 500,
    fontSize: 14,
  },
  text: {
    paddingBottom: theme.spacing(2),
    lineHeight: '1.56',
    wordBreak: 'break-word',
    hyphens: 'auto',
    color: theme.palette.type === 'dark' ? '#eee' : theme.palette.text.primary,
  },
  title: {
    fontWeight: 800,
    fontFamily: 'Google Sans',
    fontSize: 28,
    lineHeight: '34px',
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
    background: theme.palette.background.default,
    flexDirection: 'column',
  },
  companyHeader: {
    width: '100%',
  },
}))

const Post = () => {
  const [post, setPost] = useState<IPost>()
  const [company, setCompany] = useState<ICompany>()
  const [fetchError, _setError] = useState<string>()
  const { id } = useParams<{ id: string }>()
  const classes = useStyles()
  const contents = (post && post.isCorporative ? post && company : post) ? (
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
            src={post.author.avatar}
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
            <Typography key={i} variant="body2" component="span">
              <Link className={classes.hubLink} to={'/hub/' + hub.alias}>
                {hub.title}
                {post.hubs.length - 1 !== i && ', '}
              </Link>
            </Typography>
          ))}
        </div>

        {/* Article text */}
        <FormattedText
          className={classes.text}
          disableParagraphMargin={post.editorVersion === '1.0'}
        >
          {post.textHtml}
        </FormattedText>
      </Container>

      {/* Bottom bar with some article info */}
      <BottomBar post={post} />
    </>
  ) : (
    <PostViewSkeleton />
  )

  const setError = (e: string) => {
    setPost(null)
    return _setError(e)
  }

  // Get the post data
  useEffect(() => {
    const get = async () => {
      // Reset error state
      setError(null)
      window.scrollTo(0, 0)

      try {
        setPost(await getPost(id))
      } catch (e) {
        if (e?.statusCode === 404) return setError('Статья не найдена')
        else return setError(e.message)
      }
    }
    get()
  }, [id])

  // Get company data if post is corporative
  useEffect(() => {
    const get = async () => {
      const hub = post.hubs.find((e) => e.type === 'corporative')
      try {
        hub && setCompany((await getCompany(hub.alias)).data)
      } catch (e) {
        console.warn(`Cannot get company data ${hub.alias}:`, e.message)
      }
    }
    if (post && post.isCorporative) get()
  }, [post])

  if (post) document.title = post.titleHtml
  if (fetchError) return <ErrorComponent message={fetchError} />

  return (
    <div className={classes.root}>
      {contents}

      {/* Button to Comments page */}
      {post && (
        <CommentsButton
          className={classes.commentsButton}
          id={id}
          count={post.statistics.commentsCount}
        />
      )}

      {/* Similar */}
      <SimilarPosts id={id} />

      {/* Top day */}
      <TopDayPosts />
    </div>
  )
}

export default React.memo(Post)
