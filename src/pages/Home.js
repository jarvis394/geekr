import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Link from 'react-router-dom/Link'
import Avatar from '@material-ui/core/Avatar'
import Icon from '@material-ui/core/Icon'
import List from '@material-ui/core/List'
import Paper from '@material-ui/core/Paper'
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown'
import VisibilityIcon from '@material-ui/icons/Visibility'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'
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
    marginTop: theme.spacing(1),
  },
  postAuthor: {
    color:
      theme.palette.type === 'light'
        ? theme.palette.primary.light
        : theme.palette.primary.dark,
    marginRight: theme.spacing(1),
    fontWeight: 800,
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
  postBottomRow: {
    marginTop: theme.spacing(2),
  },
  postBottomRowItem: {
    color: theme.palette.text.hint,
    fontSize: 8,
  },
  postBottomRowItemIcon: {
    fontSize: 16,
    marginRight: theme.spacing(1),
  },
}))

const getPosts = () =>
  get(
    'https://m.habr.com/kek/v1/articles/?date=week&sort=date&page=1&fl=ru&hl=ru',
    { json: true }
  )

const formatNumber = n =>
  n >= 1000 ? (Math.ceil(n / 100) / 10 + 'k').replace('.', ',') : n

const PostItem = ({ post }) => {
  const classes = useStyles()
  const ts = moment(post.time_published).fromNow()
  const { login, id: authorId, avatar } = post.author
  const {
    title,
    id,
    score: sc,
    reading_count,
    favorites_count,
    comments_count,
  } = post
  const reads = formatNumber(reading_count)
  const score = formatNumber(sc)
  const favorites = formatNumber(favorites_count)
  const comments = formatNumber(comments_count)
  const bottomRow = [
    {
      icon: <ThumbsUpDownIcon className={classes.postBottomRowItemIcon} />,
      text: score,
    },
    {
      icon: <VisibilityIcon className={classes.postBottomRowItemIcon} />,
      text: reads,
    },
    {
      icon: <BookmarkIcon className={classes.postBottomRowItemIcon} />,
      text: favorites,
    },
    {
      icon: <ChatBubbleIcon className={classes.postBottomRowItemIcon} />,
      text: comments,
    },
  ]

  return (
    <Paper elevation={0} className={classes.paper}>
      <Grid container>
        <Grid alignItems="center" container xs={12} direction="row">
          <Avatar src={avatar} className={classes.postAvatar} />
          <Typography variant="caption">
            <Link
              className={classes.noDeco + ' ' + classes.postAuthor}
              to={'/user/' + authorId}
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
            to={'/article/' + id}
          >
            <Typography className={classes.postTitle}>{title}</Typography>
          </Link>
        </Grid>
        <Grid className={classes.postBottomRow} container xs={12}>
          {bottomRow.map(({ icon, text }, i) => (
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
              xs={3}
              key={i}
              className={classes.postBottomRowItem}
            >
              {icon}
              <Typography style={{ fontSize: 12, fontWeight: 600 }}>
                {text}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Paper>
  )
}

const Home = ({ state }) => {
  const [posts, setPosts] = useState()
  const classes = useStyles()

  document.title = 'habra.'

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
