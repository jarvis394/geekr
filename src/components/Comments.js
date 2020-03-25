import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { getComments } from '../api'
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
    marginLeft: 4,
  },
  comments: {
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing(2),
    overflowX: 'auto',
  },
}))

const Comments = ({ postId }) => {
  const [comments, setComments] = useState()
  const [commentsLength, setCommentsLength] = useState()
  const [fetchError, setError] = useState()
  const classes = useStyles()
  const [rootComment, setRootComment] = useState({
    children: [],
  })

  const renderComment = (node, depth = 0) => (
    <Comment key={node.id} data={node}>
      {node.children.map(e => renderComment(e, depth + 1))}
    </Comment>
  )

  useEffect(() => {
    const parseComments = nodes => {
      for (const id in nodes) {
        const comment = nodes[id]
        comment.children = []

        const parent =
          comment.parentId !== 0 ? nodes[comment.parentId] : rootComment

        if (parent === rootComment) {
          setRootComment(prev => ({
            children: [...prev.children, comment],
          }))
        } else {
          parent.children.push(comment)
        }
      }

      return nodes
    }

    const get = async () => {
      let d

      // Reset error state
      setError(null)

      try {
        d = await getComments(postId)
        const commentsData = d.data.comments

        setComments(parseComments(commentsData))
        setCommentsLength(Object.keys(commentsData).length)
      } catch (e) {
        return setError(e.message)
      }
    }
    get()
    // eslint-disable-next-line
  }, [postId])

  if (fetchError) return <p>error {fetchError}</p>
  if (!comments) return <p>no data yet...</p>

  return (
    <div className={classes.root}>
      <Container>
        <Typography className={classes.header}>
          Комментарии&nbsp;
          <span className={classes.commentsNumber}>{commentsLength}</span>
        </Typography>
      </Container>
      <Container className={classes.comments}>
        {rootComment.children.map(comment => renderComment(comment, 0))}
      </Container>
    </div>
  )
}

export default Comments
