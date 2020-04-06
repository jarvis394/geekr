import * as React from 'react'
import { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { getComments } from '../../../api'
import Comment from './Comment'
import LinearProgress from '@material-ui/core/LinearProgress'
import Fade from '@material-ui/core/Fade'
import { Comments as IComments } from 'src/interfaces'

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.background.default,
    paddingTop: theme.spacing(1),
  },
  headerContainer: {
    marginBottom: theme.spacing(1),
  },
  header: {
    fontFamily: 'Google Sans',
    fontWeight: 800,
    fontSize: 20,
  },
  commentsNumber: {
    color: theme.palette.primary.main,
    marginLeft: 4,
  },
  comments: {
    backgroundColor: theme.palette.background.paper,
    paddingBottom: theme.spacing(1),
    paddingTop: 0.05
  },
  progress: {
    marginTop: theme.spacing(1),
    borderRadius: theme.shape.borderRadius
  }
}))

const Comments = ({ postId, authorId }) => {
  const [comments, setComments] = useState<Map<number, IComments.Comment>>()
  const [commentsLength, setCommentsLength] = useState<number>()
  const [fetchError, setError] = useState()
  const classes = useStyles()
  const [rootComment, setRootComment] = useState({
    children: [],
  })

  const renderComment = (node: IComments.Comment, depth = 0) => (
    <Comment key={node.id} data={node} isAuthor={node.author ? authorId === node.author.id : false}>
      {node.children.map((e: IComments.Comment) => renderComment(e, depth + 1))}
    </Comment>
  )

  useEffect(() => {
    const parseComments = (nodes: Map<number, IComments.Comment>) => {
      const root = []
      for (const id in nodes) {
        const comment = nodes[id]
        comment.children = []

        const parent =
          comment.parentId !== 0 ? nodes[comment.parentId] : rootComment

        if (parent === rootComment) {
          root.push(comment)
        } else {
          parent.children.push(comment)
        }
      }
      
      setRootComment({ children: root })
      return nodes
    }

    const get = async () => {
      // Reset error state
      setError(null)

      try {
        const d = await getComments(postId)
        const commentsData = d.data.comments

        setCommentsLength(Object.keys(commentsData).length)
        setComments(parseComments(commentsData))
      } catch (e) {
        return setError(e.message)
      }
    }
    get()
    // eslint-disable-next-line
  }, [postId])

  if (fetchError) return <p>error {fetchError}</p>

  return (
    <div className={classes.root}>
      <Container className={classes.headerContainer}>
        <Typography className={classes.header}>
          Комментарии&nbsp;
          {commentsLength && (
            <Fade in={commentsLength !== 0}>
              <span className={classes.commentsNumber}>{commentsLength}</span>
            </Fade>
          )}
        </Typography>
      </Container>
      <Container className={classes.comments}>
        {!comments && <LinearProgress className={classes.progress} />}
        {comments && rootComment.children.map(comment => renderComment(comment, 0))}
      </Container>
    </div>
  )
}

export default Comments
