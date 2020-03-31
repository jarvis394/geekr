import React, { useState, useEffect } from 'react'
import { Typography, Paper, Grid, Divider } from '@material-ui/core'
import GreenRedNumber from 'src/components/formatters/GreenRedNumber'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { Post } from 'src/interfaces'
import getSimilar from 'src/api/getSimilar'
import moment from 'moment'

interface Props {
  id: number | string
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: 0
  },
  header: {
    fontFamily: 'Google Sans',
    fontWeight: 800,
    color: theme.palette.primary.main,
    fontSize: 20
  },
  link: {
    textDecoration: 'none',
  },
  post: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  postTitle: {
    fontFamily: 'Google Sans',
    fontWeight: 500,
    fontSize: 17,
    color: theme.palette.text.primary,
  },
  postTs: {
    color: theme.palette.text.hint,
    fontWeight: 500,
    fontSize: 12,
  }
}))

const SimilarPost = ({ data }) => {
  const classes = useStyles()
  const { score, id, title, time_published: tsUnparsed } = data
  const ts = moment(tsUnparsed).calendar()
  
  return (
    <div className={classes.post}>
      <Grid container direction="row" alignItems="center">
        <Grid item style={{ flexGrow: 1 }}>
          <Link to={'/article/' + id} className={classes.link}>
            <Typography className={classes.postTitle}>{title}</Typography>
            <Typography className={classes.postTs}>{ts}</Typography>
          </Link>
        </Grid>
        <Grid item style={{ display: 'flex', flexDirection: 'row' }}>
          <GreenRedNumber number={score} />
          <Divider orientation="vertical" />
          <Typography>H</Typography>
        </Grid>
      </Grid>
    </div>
  )
}

const SimilarPosts = (props: Props) => {
  const { id } = props
  const classes = useStyles()
  const [data, setData] = useState<Post.Post[]>()
  const [error, setError] = useState<string>()

  useEffect(() => {
    const get = async () => {
      try {
        setData((await getSimilar(Number(id))).data.articles)
      } catch (e) {
        console.warn('Could not fetch similar posts:', e.message)
        setError(e.message)
      }
    }
    get()
  }, [id])

  return (
    <Paper elevation={0} className={classes.root}>
      <Typography className={classes.header}>Похожие статьи</Typography>
      {data && data.map((e, i) => <SimilarPost data={e} key={i} />)}
    </Paper>
  )
}

export default SimilarPosts
