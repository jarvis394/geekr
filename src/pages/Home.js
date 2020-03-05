import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Link from 'react-router-dom/Link'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import { get } from 'request-promise-native'
import PostSkeleton from '../components/skeletons/Post'
import moment from 'moment'
import ruLocale from 'moment/locale/ru'

moment.locale('ru', ruLocale)

const useStyles = makeStyles(theme => ({
  root: {
    overflow: 'auto',
    background: theme.palette.background.default,
    padding: 0,
    width: '100%',
    height: '100%',
  },
  noDeco: {
    textDecoration: 'none !important',
  },
  postLink: {
    color: theme.palette.text.primary,
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: '15px',
    borderRadius: 0,
    background: theme.palette.background.paper,
  },
  postTitle: {
    fontWeight: '800',
    fontFamily: 'Google Sans',
    fontSize: 18,
    marginTop: 6,
  },
  postAuthor: {
    color:
      theme.palette.type === 'light'
        ? theme.palette.primary.light
        : theme.palette.primary.dark,
    marginRight: theme.spacing(1),
    fontWeight: 800
  },
  postTs: {
    color: theme.palette.text.hint,
  },
  postAvatar: {
    width: theme.spacing(2.5),
    height: theme.spacing(2.5),
    marginRight: theme.spacing(1),
    borderRadius: 2,
  },
}))

const getPosts = () =>
  get(
    'https://m.habr.com/kek/v1/articles/?date=week&sort=date&page=1&fl=ru&hl=ru',
    { json: true }
  )

const PostItem = ({ post }) => {
  const classes = useStyles()
  const ts = moment(post.time_published).fromNow()
  const { login, id: authorId, avatar } = post.author
  const { title, id } = post

  return (
    <Paper elevation={0} className={classes.paper}>
      <Grid container>
        <Grid alignItems="center" container xs={12} direction="row">
          <Avatar src={avatar} className={classes.postAvatar} />
          <Typography variant="caption">
            <Link
              className={classes.noDeco + ' ' + classes.postAuthor}
              to={'/u/' + authorId}
            >
              {login}
            </Link>
          </Typography>
          <Typography className={classes.postTs} variant="caption">
            {ts}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Link
            className={classes.postLink + ' ' + classes.noDeco}
            to={'/a/' + id}
          >
            <Typography className={classes.postTitle}>{title}</Typography>
          </Link>
        </Grid>
      </Grid>
    </Paper>
  )
}

const Home = ({ state }) => {
  const [posts, setPosts] = useState()
  const classes = useStyles()

  useEffect(() => {
    const get = async () => setPosts((await getPosts()).data)
    get()
  }, [])

  return (
    <List className={classes.root}>
      {posts
        ? posts.articleIds.map((id, i) => (
            <PostItem post={posts.articleRefs[id]} key={i} />
          ))
        : Array(20)
            .fill(null)
            .map((_, i) => <PostSkeleton key={i} />)}
    </List>
  )
}

export default Home
