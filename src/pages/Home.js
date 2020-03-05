import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
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
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1),
  },
  postTs: {
    color: theme.palette.text.hint,
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
  const { login, id: authorId } = post.author
  const { title, id } = post

  return (
    <Paper elevation={0} className={classes.paper}>
      <Grid container>
        <Grid alignItems="center" container xs={12} direction="row">
          <Typography variant="caption">
            <Link className={classes.noDeco + ' ' + classes.postAuthor} to={'/u/' + authorId}>
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
        : Array(50).map((_, i) => <PostSkeleton key={i} />)}
    </List>
  )
}

export default Home
