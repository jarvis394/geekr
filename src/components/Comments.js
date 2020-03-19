import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { get } from 'axios'
import Comment from './Comment'

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.background.default,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(2),
  },
  header: {
    fontFamily: 'Google Sans',
    fontWeight: 800,
    fontSize: 24,
    marginBottom: theme.spacing(3),
  },
  commentsNumber: {
    color: theme.palette.primary.main,
    marginLeft: 4
  }
}))

const Comments = ({ postId }) => {
  const [comments, setComments] = useState()
  const [threads, setThreads] = useState()
  const [fetchError, setError] = useState()
  const classes = useStyles()

  const getComments = async i =>
    (await get(`https://m.habr.com/kek/v2/articles/${i}/comments/?fl=ru&hl=ru`))
      .data

  useEffect(() => {
    const get = async () => {
      let commentsData

      // Reset error state
      setError(null)

      try {
        commentsData = await getComments(postId)
        console.log(commentsData)

        let commentsArray = []
        for (const comment in commentsData.data.comments) {
          commentsArray.push(commentsData.data.comments[comment])
        }
        setComments(commentsArray)
        setThreads(commentsData.data.threads)
      } catch (e) {
        return setError(e.message)
      }
    }
    get()
  }, [postId])

  if (fetchError) return <p>error {fetchError}</p>
  if (!comments) return <p>no data yet...</p>

  return (
    <div className={classes.root}>
      <Container>
        <Typography className={classes.header}>
          Комментарии&nbsp;
          <span className={classes.commentsNumber}>{comments.length}</span>
        </Typography>
        {comments.map((e, i) => (
          <Comment data={e} key={i} />
        ))}
      </Container>
    </div>
  )
}

export default Comments
