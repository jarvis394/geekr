import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import { makeStyles, fade } from '@material-ui/core/styles'
import { useParams } from 'react-router'
import { getPost } from '../api'
import { Link } from 'react-router-dom'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { monokai as style } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import parse from 'html-react-parser'
import PostViewSkeleton from '../components/skeletons/PostView'
import ErrorComponent from '../components/Error'
import Scrollbar from '../components/Scrollbar'
import Comments from '../components/Comments'
import moment from 'moment'
import FormattedText from '../components/FormattedText'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    maxWidth: '100vw',
    overflow: 'auto',
    background: theme.palette.background.paper,
  },
  hubs: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    wordBreak: 'break-word',
    width: '100%',
    background: theme.palette.background.default,
  },
  hubLink: {
    color: theme.palette.primary.main,
    fontWeight: 500,
    textDecoration: 'none',
  },
  authorBar: { marginTop: theme.spacing(2.5) },
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
    textDecoration: 'none'
  },
  ts: {
    color: theme.palette.text.hint,
    fontWeight: 500,
    fontSize: 14,
  },
  title: {
    fontWeight: '800',
    fontFamily: 'Google Sans',
    fontSize: 28,
    lineHeight: '34px',
    wordBreak: 'break-word',
    hyphens: 'auto',
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(2),
  },
  text: {
    marginBottom: theme.spacing(4),
    lineHeight: '1.56',
    color: theme.palette.type === 'dark' ? '#eee' : theme.palette.text.primary,
  }
}))

const Post = () => {
  const [post, setPost] = useState()
  const [fetchError, _setError] = useState()
  const classes = useStyles()
  const { id } = useParams()

  const setError = e => {
    setPost(null)
    return _setError(e)
  }

  useEffect(() => {
    const get = async () => {
      let postData

      // Reset error state
      setError(null)

      try {
        postData = await getPost(id)
        setPost(postData.data)
      } catch (e) {
        if (e.statusCode === 404) return setError('Статья не найдена')
        else return setError(e.message)
      }
    }
    get()
  }, [id])

  if (post) document.title = post.article.title
  if (fetchError) return <ErrorComponent message={fetchError} />
  if (!post) return <PostViewSkeleton />

  return (
    <div className={classes.root}>
      <Scrollbar>
        <Container className={classes.hubs}>
          {post.article.hubs.map((hub, i) => (
            <Typography key={i} variant="caption">
              <Link className={classes.hubLink} to={'/hub/' + hub.alias}>
                {hub.title}
              </Link>
              {post.article.hubs.length - 1 !== i && ', '}
            </Typography>
          ))}
        </Container>
        <Divider />
        <Container>
          <Grid
            className={classes.authorBar}
            container
            direction="row"
            alignItems="center"
          >
            <Avatar
              src={post.article.author.avatar}
              className={classes.avatar}
            />
            <Typography component={Link} to={'/user/' + post.article.author.login} className={classes.author}>
              {post.article.author.login}
            </Typography>
            <Typography className={classes.ts}>
              {moment(post.article.time_published).fromNow()}
            </Typography>
          </Grid>
          <Typography className={classes.title}>
            {post.article.title}
          </Typography>

          {/* Article text */}
          {/* <FormattedText className={classes.text}>{post.article.text_html}</FormattedText> */}
        </Container>

        {/* Comments section */}
        <Comments postId={id} />
      </Scrollbar>
    </div>
  )
}

export default Post
