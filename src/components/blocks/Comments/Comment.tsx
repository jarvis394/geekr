import * as React from 'react'
import { Button, Fade, Grid, Typography } from '@material-ui/core'
import { makeStyles, fade } from '@material-ui/core/styles'
import { Link, useHistory, useLocation } from 'react-router-dom'
import dayjs from 'dayjs'
import FormattedText from '../../formatters/FormattedText'
import GreenRedNumber from '../../formatters/GreenRedNumber'
import UserAvatar from '../UserAvatar'
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import { Comment as DataComment } from 'src/interfaces'
import { LazyLoadComponent } from 'react-lazy-load-image-component'

interface Classes {
  isAuthor: boolean
  isFavorite: boolean
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    marginTop: theme.spacing(2),
    borderBottom: '1px solid ' + fade(theme.palette.divider, 0.06),
    padding: theme.spacing(0, 2, 1.5, 2),
    '-webkit-tap-highlight-color': 'transparent !important',
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
  wrapper: {
    '&:hover': {
      opacity: '1 !important',
    },
    transitionDuration: '0.1s',
  },
  placeholder: {
    height: '200px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
  },
  noDeco: {
    textDecoration: 'none !important',
  },
  author: {
    backgroundColor: ({ isAuthor }: Classes) =>
      isAuthor ? fade(theme.palette.primary.light, 0.2) : 'transparent',
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
    marginTop: theme.spacing(1.5),
    lineHeight: '22px',
    fontSize: 15,
    wordBreak: 'break-word',
    hyphens: 'auto',
    '& p': {
      margin: 0,
    },
  },
  ufo: {
    fontWeight: 500,
    fontFamily: 'Google Sans',
  },
  greenRedNumber: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
  },
  bottomBarScoreWrapper: {
    color: theme.palette.text.hint,
    flexGrow: 1,
  },
  score: {
    position: 'relative',
    fontWeight: 700,
    fontSize: 13,
  },
  bottomBar: {
    marginTop: theme.spacing(1.5),
    display: 'flex',
    alignItems: 'center',
  },
  thumbsUpDownIcon: {
    fontSize: 16,
    marginRight: theme.spacing(1),
  },
  replyButton: {
    borderRadius: 16,
    backgroundColor: fade(theme.palette.primary.light, 0.1),
    padding: theme.spacing(0.5, 1.5),
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.light, 0.1) + ' !important',
    },
  },
  favoriteButton: {
    borderRadius: '50%',
    minWidth: 28,
    padding: 5,
    marginRight: theme.spacing(1),
  },
  favoriteIcon: {
    fontSize: 20,
    color: ({ isFavorite }: Classes) =>
      isFavorite
        ? theme.palette.primary.light
        : fade(theme.palette.primary.main, 0.2),
  },
}))

const getOpacity = (value: number) => {
  const v = Math.abs(value)
  const r = Math.min(v / 10 + 0.1, 0.5)
  return 1 - r
}

const MARGIN_LEVEL = 32
const MAX_LEVEL = 5

const Comment = ({ data }: { data: DataComment }) => {
  const [isFavorite, setIsFavorite] = React.useState(false)
  const history = useHistory()
  const location = useLocation()
  const classes = useStyles({
    isAuthor: data.isPostAuthor,
    isFavorite,
  })
  const { message } = data
  const ts = dayjs(data.timePublished).fromNow()
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
    <LazyLoadComponent placeholder={<div className={classes.placeholder} />}>
      <Fade in>
        <div className={classes.root}>
          <div
            style={{ marginLeft: margin, opacity: commentOpacity }}
            className={classes.wrapper}
          >
            {/* Top bar */}
            <Grid
              style={{ position: 'relative' }}
              onClick={() => history.push(location.pathname + '#' + data.id)}
              alignItems="center"
              container
              direction="row"
              className={classes.author}
              id={data.id.toString()}
            >
              <UserAvatar
                src={data.author.avatarUrl}
                alias={data.author.alias}
                className={classes.avatar}
              />
              <Typography variant="caption">
                <Link
                  className={[classes.noDeco, classes.authorLink].join(' ')}
                  to={'/user/' + data.author.alias}
                >
                  {data.author.alias}
                </Link>
              </Typography>
              <Typography className={classes.ts} variant="caption">
                {ts}
              </Typography>
            </Grid>

            {/* Message */}
            <FormattedText className={classes.text}>{message}</FormattedText>

            {/* Bottom bar */}
            <div className={classes.bottomBar}>
              <div className={classes.bottomBarScoreWrapper}>
                <GreenRedNumber
                  number={data.score}
                  wrapperProps={{ className: classes.greenRedNumber }}
                >
                  <>
                    <ThumbsUpDownIcon className={classes.thumbsUpDownIcon} />
                    <Typography className={classes.score}>
                      {data.score > 0 ? '+' : ''}
                      {data.score}
                    </Typography>
                  </>
                </GreenRedNumber>
              </div>
              <Button
                onClick={() => setIsFavorite((p) => !p)}
                color="primary"
                size="small"
                className={classes.favoriteButton}
              >
                <BookmarkIcon className={classes.favoriteIcon} />
              </Button>
              <Button
                color="primary"
                size="small"
                className={classes.replyButton}
              >
                Ответить
              </Button>
            </div>
          </div>
        </div>
      </Fade>
    </LazyLoadComponent>
  )
}

export default React.memo(Comment)
