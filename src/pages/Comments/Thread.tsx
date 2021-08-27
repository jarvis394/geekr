import React, { useEffect, useMemo } from 'react'
import { makeStyles, useTheme } from '@material-ui/core'
import OutsidePage from 'src/components/blocks/OutsidePage'
import { useDispatch } from 'react-redux'
import { useSelector } from 'src/hooks'
import { useParams } from 'react-router'
import { getPostComments } from 'src/store/actions/post'
import Comment from './Comment'
import {
  trackWindowScroll,
  ScrollPosition,
} from 'react-lazy-load-image-component'
import { FetchingState } from 'src/interfaces'
import { THREAD_LEVEL } from 'src/config/constants'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
}))

const Thread: React.FC = () => {
  const theme = useTheme()
  const classes = useStyles()
  const dispatch = useDispatch()
  const { threadId, id } = useParams<{ threadId: string; id: string }>()
  const comments = useSelector((store) => store.post.comments.comments)
  const commentsFetchingState = useSelector(
    (store) => store.post.comments.state
  )
  const commentsFetchingError = useSelector(
    (store) => store.post.comments.fetchError
  )
  const rootComment = useMemo(
    () => comments?.find((e) => e.id.toString() === threadId),
    [threadId, comments]
  )
  const filteredComments = useMemo(() => {
    const a = comments?.filter(
      (e) =>
        e.threadLevel === rootComment.threadLevel + 1 ||
        e.level === THREAD_LEVEL * (rootComment.threadLevel + 1) - 1
    )
    const rootIndex = a?.findIndex((e) => e.id.toString() === threadId)
    const lastIndex = a?.findIndex(
      (e, i) =>
        e.level === THREAD_LEVEL * (rootComment.threadLevel + 1) - 1 &&
        i > rootIndex
    )
    const slice = a?.slice(rootIndex, lastIndex)
    return slice
  }, [threadId, comments])
  const shouldShowComments = commentsFetchingState === FetchingState.Fetched

  useEffect(() => {
    if (!comments) dispatch(getPostComments(id))
  }, [id, comments, threadId])

  return (
    <OutsidePage
      hidePositionBar
      disableShrinking
      headerText={'Ветка'}
      backgroundColor={theme.palette.background.paper}
    >
      <div className={classes.root}>
        {commentsFetchingState === FetchingState.Error && (
          <p>{commentsFetchingError}</p>
        )}
        {shouldShowComments &&
          filteredComments.map((e, i) => (
            <Comment
              postId={id}
              isLastInFilteredRootThread={i === filteredComments.length - 1}
              data={{
                ...e,
                isThreadStart: i === 0 ? false : e.isThreadStart,
                level:
                  e.level + 1 - THREAD_LEVEL * (rootComment.threadLevel + 1),
              }}
              key={e.id}
            />
          ))}
      </div>
    </OutsidePage>
  )
}

export default React.memo(trackWindowScroll(Thread))
