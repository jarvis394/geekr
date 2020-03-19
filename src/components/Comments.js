import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { get } from 'axios'
import Comment from './Comment'

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.background.default,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  header: {
    fontFamily: 'Google Sans',
    fontWeight: 800,
    fontSize: 20,
    marginBottom: theme.spacing(1),
  },
  commentsNumber: {
    color: theme.palette.primary.main,
    marginLeft: 4
  },
  comments: {
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing(2)
  }
}))

const Comments = ({ postId }) => {
  const [comments, setComments] = useState()
  const [fetchError, setError] = useState()
  const classes = useStyles()
  let rootComment = { children: [] }

  const getComments = async i =>
    (await get(`https://m.habr.com/kek/v2/articles/${i}/comments/?fl=ru&hl=ru`))
      .data

  const parseComments = (nodes) => {
    for (const id in nodes) {
      const comment = nodes[id]       
      comment.children = []

      const parent = (comment.parentId != 0) ? nodes[comment.parentId] : rootComment
      parent.children.push(comment) 
    }

    return nodes
  }

  
  const drawComments = (node, depth) => {
    

    node.children.forEach(child => {
      drawComments(child, depth + 1)
    })
  }

  useEffect(() => {
    const get = async () => {
      let d

      // Reset error state
      setError(null)

      try {
        d = await getComments(postId)
        const commentsData = d.data.comments

        setComments(parseComments(commentsData))

        rootComment.children.forEach(comment => {
          drawComments(comment, 0)
        })
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
      </Container>
      <Container className={classes.comments}>
      </Container>
    </div>
  )
}

export default Comments
