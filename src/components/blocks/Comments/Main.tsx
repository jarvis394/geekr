import * as React from 'react'
import { useState, useEffect, useRef, useCallback } from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { getComments } from '../../../api'
import Comment from './Comment'
import LinearProgress from '@material-ui/core/LinearProgress'
import Fade from '@material-ui/core/Fade'
import { Comment as IComment, Post } from 'src/interfaces'
import isInViewport from 'src/utils/isInViewport'

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    paddingTop: theme.spacing(1.5),
  },
  header: {
    fontFamily: 'Google Sans',
    fontWeight: 800,
    fontSize: 24,
    margin: theme.spacing(0, 2),
  },
  commentsNumber: {
    color: theme.palette.primary.main,
    marginLeft: 4,
  },
  comments: {
    backgroundColor: theme.palette.background.default,
    paddingTop: 0.05,
  },
  progress: {
    marginTop: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(0, 2),
  },
  nothingText: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  errorText: {
    color: theme.palette.error.main,
    fontWeight: 500,
    fontFamily: 'Google Sans',
  },
}))

const MIN_COMMENTS_SLICE = 25
const SCROLL_OFFSET = 256

const Comments = ({ post }: { post: Post }) => {
  const [comments, setComments] = useState<IComment[]>()
  const [commentsSliceEnd, setCommentsSliceEnd] = useState<number>(
    MIN_COMMENTS_SLICE
  )
  const [isLoadingNewComments, setIsLoadingNewComments] = useState<boolean>(
    false
  )
  const [commentsLength, setCommentsLength] = useState<number>()
  const [fetchError, setError] = useState<string>()
  const classes = useStyles()
  const commentsEndRef = useRef()

  const onScroll = useCallback(() => {
    if (commentsSliceEnd >= commentsLength) {
      if (isLoadingNewComments) setIsLoadingNewComments(false)
      return
    }

    if (isInViewport(commentsEndRef, SCROLL_OFFSET) && !isLoadingNewComments) {
      setCommentsSliceEnd((prev) => prev + MIN_COMMENTS_SLICE)
      setIsLoadingNewComments(true)
    } else {
      setIsLoadingNewComments(false)
    }
  }, [commentsSliceEnd, isLoadingNewComments, commentsLength])

  const flatten = useCallback((nodes, a = []) => {
    nodes.forEach((e) => {
      a.push(e)
      flatten(e.children, a)
    })
    return a
  }, [])

  useEffect(() => {
    const parseComments = (nodes: Map<number, IComment>) => {
      const root = []
      for (const id in nodes) {
        const comment = nodes[id]
        comment.children = []

        const parent = comment.parentId !== 0 ? nodes[comment.parentId] : null

        if (!parent) {
          root.push(comment)
        } else {
          parent.children.push(comment)
        }
      }

      return root
    }

    window.addEventListener('scroll', onScroll)

    const get = async () => {
      // Reset error state
      setError(null)

      try {
        const d = await getComments(post.id)
        const commentsData = d.comments
        const parsedComments = parseComments(commentsData)
        const flat = flatten(parsedComments)

        console.log(commentsData)
        console.log(parsedComments)
        console.log(flat)

        setCommentsLength(Object.keys(commentsData).length)
        setComments(flat.map((x: IComment) => delete x.children && x))
      } catch (e) {
        console.error('On getting comments data:', e.message)
        return setError('Произошла ошибка при запросе')
      }
    }
    post && get()

    return () => window.removeEventListener('scroll', onScroll)
  }, [post])

  if (fetchError)
    return <Typography className={classes.errorText}>{fetchError}</Typography>

  return (
    <div className={classes.root}>
      <Typography className={classes.header}>
        Комментарии&nbsp;
        {commentsLength && (
          <Fade in={commentsLength !== 0}>
            <span className={classes.commentsNumber}>{commentsLength}</span>
          </Fade>
        )}
      </Typography>
      <div className={classes.comments}>
        {commentsLength === 0 && (
          <Typography className={classes.nothingText}>Пусто!</Typography>
        )}
        {comments &&
          comments
            .slice(0, commentsSliceEnd)
            .map((node) => <Comment key={node.id} data={node} />)}
        {commentsLength !== 0 && (!comments || isLoadingNewComments) && (
          <LinearProgress className={classes.progress} />
        )}
        <div ref={commentsEndRef} />
      </div>
    </div>
  )
}

export default React.memo(Comments)
