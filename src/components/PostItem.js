import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Paper from '@material-ui/core/Paper'
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown'
import VisibilityIcon from '@material-ui/icons/Visibility'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  noDeco: {
    textDecoration: 'none !important',
  },
  postLink: {
    color: theme.palette.text.primary,
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
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
  redText: { color: theme.palette.error.main },
  greenText: { color: theme.palette.success.main },
}))

export const formatNumber = n =>
  n >= 1000 ? (Math.ceil(n / 100) / 10 + 'k').replace('.', ',') : n

export default ({ post }) => {
  const classes = useStyles()
  const ts = moment(post.time_published).calendar().toLowerCase()
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
      coloredText: true,
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

  const getFormattedText = n => {
    let className = 'postBottomRowItem'
    let text = n.toString()
    if (n > 0) {
      text = '+' + text
      className = 'greenText'
    } else if (n < 0) {
      text = '-' + text
      className = 'redText'
    }
    
    return <Typography style={{ fontSize: 12, fontWeight: 600 }} className={classes[className]}>{text}</Typography>
  }

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
          {bottomRow.map(({ icon, text, coloredText }, i) => (
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
                {coloredText ? getFormattedText(text) : text}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Paper>
  )
}
