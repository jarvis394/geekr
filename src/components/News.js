import React, { useEffect, useState } from 'react'
import { Paper, Grid, Typography, Box, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import RightIcon from '@material-ui/icons/ChevronRightRounded'
import { Link } from 'react-router-dom'
import { get } from 'axios'
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
    marginTop: theme.spacing(2),
  },
  title: {
    fontFamily: 'Google Sans',
    fontWeight: 500,
    fontSize: 17,
    color: theme.palette.text.primary
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
  noDeco: { textDecoration: 'none' },
}))

const NewsItem = ({ data }) => {
  const classes = useStyles()
  const ts = moment(data.time_published).calendar()

  return (
    <Link to={'/article/' + data.id} className={classes.noDeco}>
      <Grid container direction="column" className={classes.item}>
        <Grid item>
          <Typography className={classes.title}>{data.title}</Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.ts}>{ts}</Typography>
        </Grid>
      </Grid>
    </Link>
  )
}

const News = () => {
  const [news, setNews] = useState()
  const classes = useStyles()

  const getNews = async () =>
    (await get('https://m.habr.com/kek/v1/news/promolist?fl=ru&hl=ru')).data

  useEffect(() => {
    const get = async () => {
      try {
        setNews((await getNews()).data.items)
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
          to="/news/page/1"
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
