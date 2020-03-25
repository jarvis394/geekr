import React, { useEffect, useState } from 'react'
import { Paper, Grid, Typography, Box, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import RightIcon from '@material-ui/icons/ChevronRightRounded'
import numToWord from 'number-to-words-ru'
import { Link } from 'react-router-dom'
import { getNewsPromo } from '../../api'
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
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
  },
  title: {
    fontFamily: 'Google Sans',
    fontWeight: 500,
    fontSize: 17,
    color: theme.palette.text.primary,
  },
  ts: {
    fontWeight: 500,
    fontSize: 12,
    color: theme.palette.text.hint,
  },
  linkBox: { marginTop: theme.spacing(2) },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    fontSize: 14,
    fontFamily: 'Google Sans',
    fontWeight: 500,
    textTransform: 'none'
  },
  dot: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    fontWeight: 500,
    fontSize: 12,
    color: theme.palette.text.hint,
  },
  article: {
    textDecoration: 'none'
  },
}))

const NewsItem = ({ data }) => {
  const classes = useStyles()
  const ts = moment(data.time_published).calendar()
  const commentsCount = numToWord.convert(data.comments_count, {
    currency: {
      currencyNameCases: ['комментарий', 'комментария', 'комментариев'],
      fractionalPartNameCases: ['', '', ''],
      currencyNounGender: {
        integer: 0,
        fractionalPart: 0
      }
    },
    showNumberParts: {
      integer: true,
      fractional: false,
    },
    convertNumbertToWords: {
      integer: false,
      fractional: false,
    }
  })

  return (
    <Link to={'/article/' + data.id} className={classes.article}>
      <Grid container direction="column" className={classes.item}>
        <Grid item>
          <Typography className={classes.title}>{data.title}</Typography>
        </Grid>
        <Grid container direction="row">
          <Typography className={classes.ts}>{ts}</Typography>
          <span className={classes.dot}>•</span>
          <Typography className={classes.ts}>{commentsCount}</Typography>
        </Grid>
      </Grid>
    </Link>
  )
}

const News = () => {
  const [news, setNews] = useState()
  const classes = useStyles()

  useEffect(() => {
    const get = async () => {
      try {
        setNews((await getNewsPromo()).data.items)
      } catch (e) {
        console.error('Could not fetch news:', e)
      }
    }
    get()
  }, [])

  return news ? (
    <Paper className={classes.root} elevation={0}>
      <Typography className={classes.header}>Новости</Typography>
      {news.map((e, i) => (
        <NewsItem data={e} key={i} />
      ))}
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
  ) : null
}

export default News
