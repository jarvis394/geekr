import * as React from 'react'
import { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { getComments } from '../../../api'
import Comment from './Comment'
import LinearProgress from '@material-ui/core/LinearProgress'
import Fade from '@material-ui/core/Fade'

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
    paddingBottom: theme.spacing(1),
    overflowX: 'auto',
  },
  progress: {
    borderRadius: theme.shape.borderRadius
  }
}))

const Comments = ({ postId, authorId }) => {
  const [comments, setComments] = useState<any[]>()
  const [commentsLength, setCommentsLength] = useState<number>()
  const [fetchError, setError] = useState()
  const classes = useStyles()
  const [rootComment, setRootComment] = useState({
    children: [],
  })

  const renderComment = (node, depth = 0) => (
    <Comment key={node.id} data={node} isAuthor={node.author ? authorId === node.author.id : false}>
      {node.children.map(e => renderComment(e, depth + 1))}
    </Comment>
  )

  useEffect(() => {
    const parseComments = nodes => {
      let root = []
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
    
    /*const parseComments = nodes => {
      const getChildren = n => n.map(e => {
        if (isNaN(e)) return e
        
        const i = nodes[e]
        if (i.children.length !== 0) i.children = getChildren(i.children)
          
        return i
      })
        
      
      let root = []
      
      for (const id in nodes) {
        if (nodes[id].parentId === 0) {
          if (nodes[id].children.length !== 0) nodes[id].children = getChildren(nodes[id].children)
          root.push(nodes[id])
        }
      }
      
      root.filter(e => e.parentId === 0)
      setRootComment({ children: root })
      
      return root
    }*/

    const get = async () => {
      let d

      // Reset error state
      setError(null)

      try {
        d = await getComments(postId)
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
      <Container>
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
