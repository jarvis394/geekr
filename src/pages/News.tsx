import * as React from 'react'
import { useEffect } from 'react'
import List from '@material-ui/core/List'
import { makeStyles } from '@material-ui/core/styles'
import PostSkeleton from '../components/skeletons/Post'
import PostItem from '../components/blocks/PostItem'
import Pagination from '../components/blocks/Pagination'
import { useHistory, useParams } from 'react-router-dom'
import ErrorComponent from '../components/blocks/Error'
import { useDispatch } from 'react-redux'
import { getNews } from 'src/store/actions/news'
import { useSelector } from 'src/hooks'

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    padding: 0,
    width: '100%',
  },
}))

type NewsPathParams = { page: string }

const News = () => {
  const params = useParams() as NewsPathParams
  const currentPage = Number(params.page)
  const history = useHistory()
  const classes = useStyles()
  const dispatch = useDispatch()
  const isFetched = useSelector((state) => state.news.fetched)
  const isFetching = useSelector((state) => state.news.fetching)
  const fetchError = useSelector((state) => state.news.error)
  const posts = useSelector((state) => state.news.data.pages[currentPage])
  const pagesCount = useSelector((state) => state.news.data.pagesCount)

  const PaginationComponent = () =>
    pagesCount ? (
      <Pagination
        disabled={isFetching}
        handleChange={handlePagination}
        steps={pagesCount}
        currentStep={currentPage}
      />
    ) : null

  const handlePagination = (_: never, i: number) => {
    if (i === currentPage) return
    else history.push('/news/p/' + i)
  }

  useEffect(() => {
    dispatch(getNews(currentPage))
  }, [currentPage, dispatch])

  return (
    <List className={classes.root}>
      {isFetching && [...new Array(7)].map((_, i) => <PostSkeleton key={i} />)}
      {isFetched &&
        !fetchError &&
        posts &&
        posts.articleIds.map((i: number) => (
          <PostItem post={posts.articleRefs[i]} key={i} />
        ))}
      {fetchError && (
        <ErrorComponent message={fetchError.error.message} to="/news/p/1" />
      )}
      <PaginationComponent />
    </List>
  )
}

export default React.memo(News)
