import * as React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles, fade } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import moment from 'moment'
import FormattedText from '../../formatters/FormattedText'
import GreenRedNumber from '../../formatters/GreenRedNumber'
import UserAvatar from '../UserAvatar'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    marginTop: theme.spacing(2),
    transitionDuration: '0.1s',
    '&:hover': {
      opacity: '1 !important',
    },
  },
  noDeco: {
    textDecoration: 'none !important',
  },
  author: {
    backgroundColor: (isAuthor) =>
      isAuthor ? fade(theme.palette.primary.light, 0.1) : 'transparent',
    borderRadius: theme.shape.borderRadius,
  },
  authorLink: {
    color:
      theme.palette.type === 'light'
        ? theme.palette.primary.light
        : theme.palette.primary.dark,
    marginRight: theme.spacing(1),
    fontWeight: 800,
  },
  ts: {
    color: theme.palette.text.hint,
  },
  avatar: {
    width: 20,
    height: 20,
    marginRight: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
  },
  text: {
    marginTop: theme.spacing(1),
    lineHeight: '22px',
    fontSize: 15,
    wordBreak: 'break-word',
    hyphens: 'auto',
  },
  ufo: {
    fontWeight: 500,
    fontFamily: 'Google Sans',
  },
  children: { marginLeft: theme.spacing(4) },
  collapseHolder: {
    position: 'absolute',
    left: -40,
    cursor: 'pointer',
    padding: 16,
  },
  collapseButton: {
    border: '2px solid ' + theme.palette.text.hint,
    borderRadius: '50%',
    height: 4,
    width: 4,
  },
  collapsedButton: {},
  collapsedTitle: {
    color: theme.palette.text.hint,
    fontSize: 14,
    fontWeight: 500,
    fontFamily: 'Google Sans',
  },
  collapsedLine: {
    borderBottom: ' 1px dashed ' + theme.palette.text.hint,
    flexGrow: 1,
    height: 1,
    marginLeft: 16,
    position: 'relative',
  },
  score: {
    position: 'absolute',
    right: 0,
    fontWeight: 800,
    fontSize: 14,
  },
  scoreColor: {
    color: theme.palette.text.hint,
  },
}))

const getOpacity = (value: number) => {
  const v = Math.abs(value)
  const r = Math.min(v / 10 + 0.1, 0.5)
  return 1 - r
}

const MARGIN_LEVEL = 16
const MAX_LEVEL = 10

const Comment = ({ data, isAuthor }) => {
  const classes = useStyles(isAuthor)
  const { message } = data
  const ts = moment(data.timePublished).fromNow()
  const commentOpacity = data.score < 0 ? getOpacity(data.score) : 1
  const margin =
    data.level > MAX_LEVEL
      ? MAX_LEVEL * MARGIN_LEVEL
      : data.level * MARGIN_LEVEL

  if (!data.author) {
    return (
      <div style={{ marginLeft: margin }} className={classes.root}>
        <FormattedText className={classes.text + ' ' + classes.ufo}>
          {message}
        </FormattedText>
      </div>
    )
  }

  return (
    <div
      style={{ marginLeft: margin, opacity: commentOpacity }}
      className={classes.root}
    >
      {/* Top bar */}
      <Grid
        style={{ position: 'relative' }}
        alignItems="center"
        container
        direction="row"
        className={classes.author}
      >
        <UserAvatar
          src={data.author.avatarUrl}
          login={data.author.login}
          className={classes.avatar}
        />
        <Typography variant="caption">
          <Link
            className={classes.noDeco + ' ' + classes.authorLink}
            to={'/user/' + data.author.login}
          >
            {data.author.login}
          </Link>
        </Typography>
        <Typography className={classes.ts} variant="caption">
          {ts}
        </Typography>
        <GreenRedNumber
          classes={classes.score}
          defaultClass={classes.scoreColor}
          number={data.score}
        />
      </Grid>

      {/* Message */}
      <FormattedText className={classes.text}>{message}</FormattedText>
    </div>
  )
}

export default Comment
