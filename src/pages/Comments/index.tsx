import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router'
import { Fade, Typography, useTheme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import OutsidePage from 'src/components/blocks/OutsidePage'
import { useDispatch } from 'react-redux'
import { getPost, getPostComments } from 'src/store/actions/post'
import { useSelector } from 'src/hooks'
import { FetchingState } from 'src/interfaces'
import Comment from './Comment'
import {
  ScrollPosition,
  trackWindowScroll,
} from 'react-lazy-load-image-component'

const useStyles = makeStyles((theme) => ({
  errorText: {
    color: theme.palette.error.main,
    fontWeight: 500,
    fontFamily: 'Google Sans',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  header: {
    fontFamily: 'Google Sans',
    fontWeight: 800,
    fontSize: 24,
    margin: theme.spacing(1.5, 2),
    marginBottom: 0,
  },
  commentsNumber: {
    color: theme.palette.primary.main,
    marginLeft: 4,
  },
}))

const CommentsPage: React.FC<{ scrollPosition: ScrollPosition }> = ({
  scrollPosition,
}) => {
  const { id } = useParams<{ id: string }>()
  const post = useSelector((store) => store.post.post.data)
  const postFetchingState = useSelector((store) => store.post.post.state)
  const postFetchingError = useSelector((store) => store.post.post.fetchError)
  const comments = useSelector((store) => store.post.comments.comments)
  const commentsFetchingState = useSelector(
    (store) => store.post.comments.state
  )
  const commentsFetchingError = useSelector(
    (store) => store.post.comments.fetchError
  )
  const dispatch = useDispatch()
  const theme = useTheme()
  const classes = useStyles()
  const [commentsLength, setCommentsLength] = useState<number>()
  const shouldShowComments = commentsFetchingState === FetchingState.Fetched
  const filteredComments = useMemo(
    () => comments?.filter((e) => e.threadLevel === 0) || [],
    [comments]
  )

  useEffect(() => {
    if (!post || post?.id !== id) dispatch(getPost(id))
    if (!comments) dispatch(getPostComments(id))
    if (comments) {
      setCommentsLength(comments.length)
    }
  }, [id, comments])

  if (postFetchingState === FetchingState.Error)
    return (
      <Typography className={classes.errorText}>{postFetchingError}</Typography>
    )
  if (commentsFetchingState === FetchingState.Error)
    return (
      <Typography className={classes.errorText}>
        {commentsFetchingError}
      </Typography>
    )

  return (
    <OutsidePage
      hidePositionBar
      disableShrinking
      headerText={post?.titleHtml}
      backgroundColor={theme.palette.background.paper}
    >
      <div className={classes.root}>
        <Typography className={classes.header}>
          Комментарии&nbsp;
          {commentsLength && (
            <Fade in={commentsLength !== 0}>
              <span className={classes.commentsNumber}>{commentsLength}</span>
            </Fade>
          )}
        </Typography>
        <div>
          {shouldShowComments &&
            filteredComments.map((e, i) => (
              <Comment
                postId={id}
                scrollPosition={scrollPosition}
                isLastInFilteredRootThread={
                  filteredComments[Math.min(i + 1, filteredComments.length - 1)]
                    .level === 0
                }
                data={e}
                key={e.id}
              />
            ))}
        </div>
      </div>
    </OutsidePage>
  )
}

export default React.memo(trackWindowScroll(CommentsPage))
