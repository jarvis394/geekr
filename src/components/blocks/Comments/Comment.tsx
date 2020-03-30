import * as React from 'react'
import { useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles, fade } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import moment from 'moment'
import FormattedText from '../../formatters/FormattedText'
import UserAvatar from '../UserAvatar'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(2),
  },
  noDeco: {
    textDecoration: 'none !important',
  },
  author: {
    backgroundColor: isAuthor =>
      isAuthor ? fade(theme.palette.primary.light, 0.1) : 'transparent',
    borderRadius: theme.shape.borderRadius
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
    marginRight: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
  },
  text: {
    marginTop: theme.spacing(1),
    lineHeight: '22px',
    fontSize: 15,
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
}))

const Comment = ({ data, children, isAuthor }) => {
  const classes = useStyles(isAuthor)
  const [isOpen, setOpenState] = useState(true)
  const { message } = data
  const ts = moment(data.timePublished).fromNow()

  if (!data.author) {
    return (
      <div className={classes.root}>
        <FormattedText className={classes.text + ' ' + classes.ufo}>
          {message}
        </FormattedText>

        {children.length !== 0 && (
          <div className={classes.children}>{children}</div>
        )}
      </div>
    )
  }

  if (!isOpen)
    return (
      <div
        title="Развернуть дерево комментариев"
        onClick={() => setOpenState(true)}
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          marginTop: 16,
          cursor: 'pointer',
        }}
      >
        <div className={classes.collapseHolder}>
          <div className={classes.collapseButton}></div>
        </div>
        <Typography className={classes.collapsedTitle}>
          Раскрыть ветку
        </Typography>
        <div className={classes.collapsedLine}></div>
      </div>
    )

  return (
    <div className={classes.root}>
      {/* Top bar */}
      <Grid
        style={{ position: 'relative' }}
        alignItems="center"
        container
        direction="row"
        className={classes.author}
      >
        {children.length !== 0 && data.level !== 0 && (
          <div
            title="Свернуть дерево комментариев"
            onClick={() => setOpenState(false)}
            className={classes.collapseHolder}
          >
            <div className={classes.collapseButton}></div>
          </div>
        )}
        <UserAvatar src={data.author.avatarUrl} login={data.author.login} className={classes.avatar} />
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
      </Grid>

      {/* Message */}
      <FormattedText className={classes.text}>{message}</FormattedText>

      {children.length !== 0 && (
        <div className={classes.children}>{children}</div>
      )}
    </div>
  )
}

export default Comment
