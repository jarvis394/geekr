import * as React from 'react'
import { useState, useEffect } from 'react'
import { Paper, Grid, Typography, Box, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import RightIcon from '@material-ui/icons/ChevronRightRounded'
import numToWord from 'number-to-words-ru'
import { Link } from 'react-router-dom'
import { getNewsPromo } from '../../api'
import moment from 'moment'
import NewsItemSkeleton from '../skeletons/NewsItem'
import { NewsItem as INewsItem } from 'src/interfaces/News'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: 0,
  },
  header: {
    fontFamily: 'Google Sans',
    fontWeight: 800,
    fontSize: 16,
    color: theme.palette.primary.main,
    paddingBottom: theme.spacing(1),
  },
  item: {
    padding: `${theme.spacing(1)}px 0 ${theme.spacing(1)}px 0`,
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Google Sans',
    fontWeight: 500,
    fontSize: 16,
    color: theme.palette.text.primary,
  },
  ts: {
    fontWeight: 500,
    fontSize: 14,
    color: theme.palette.text.hint,
    fontFamily: 'Google Sans',
    paddingTop: 2,
  },
  linkBox: { marginTop: theme.spacing(2) },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    fontSize: 14,
    fontFamily: 'Google Sans',
    fontWeight: 500,
    textTransform: 'none',
  },
  dot: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    fontWeight: 500,
    fontSize: 12,
    color: theme.palette.text.hint,
  },
  article: {
    textDecoration: 'none',
  },
  error: {
    color: theme.palette.error.light,
    fontWeight: 800,
  },
}))

const NewsItem = ({ data }): React.ReactElement => {
  const classes = useStyles()
  const ts = moment(data.time_published).calendar()
  const commentsCount = numToWord.convert(data.comments_count, {
    currency: {
      currencyNameCases: ['комментарий', 'комментария', 'комментариев'],
      fractionalPartNameCases: ['', '', ''],
      currencyNounGender: {
        integer: 0,
        fractionalPart: 0,
      },
    },
    showNumberParts: {
      integer: true,
      fractional: false,
    },
    convertNumbertToWords: {
      integer: false,
      fractional: false,
    },
  })

  return (
    <Link to={'/article/' + data.id} className={classes.article}>
      <Grid container direction="row" className={classes.item}>
        <Grid container direction="column">
          <Grid item>
            <Typography className={classes.title}>{data.title}</Typography>
          </Grid>
          <Grid container direction="row" alignItems="center">
            <Typography className={classes.ts}>{ts}</Typography>
            <span className={classes.dot}>•</span>
            <Typography className={classes.ts}>{commentsCount}</Typography>
          </Grid>
        </Grid>
        <Grid item>
          <RightIcon color="disabled" />
        </Grid>
      </Grid>
    </Link>
  )
}

const News = ({ setState, state }) => {
  const [news, setNews] = useState<INewsItem[]>(state.cache.news.block)
  const [fetchError, setError] = useState<null | string>()
  const classes = useStyles()

  useEffect(() => {
    const get = async () => {
      setError(null)
      try {
        const data = (await getNewsPromo()).data.items
        setState((prev) => ({
          ...prev,
          cache: {
            ...prev.cache,
            news: {
              ...prev.cache.news,
              block: data,
            },
          },
        }))
        setNews(data)
      } catch (e) {
        console.error('Could not fetch news:', e)
        setError(e.message)
      }
    }
    if (!news) get()
    // eslint-disable-next-line
  }, [])

  return (
    <Paper className={classes.root} elevation={0}>
      <Typography className={classes.header}>Новости</Typography>
      {fetchError && (
        <Typography className={classes.error}>
          Произошла ошибка при выполнении запроса
        </Typography>
      )}
      {!news &&
        !fetchError &&
        [...Array(5)].map((_, i) => <NewsItemSkeleton key={i} />)}
      {news && news.map((e, i) => <NewsItem data={e} key={i} />)}
      <Box className={classes.linkBox}>
        <Button
          size="small"
          component={Link}
          color="primary"
          to="/news/p/1"
          className={classes.link}
          endIcon={<RightIcon />}
        >
          Все новости
        </Button>
      </Box>
    </Paper>
  )
}

export default News
