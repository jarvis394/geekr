import React, { useEffect } from 'react'
import { useSelector } from 'src/hooks'
import PostItem from 'src/components/blocks/PostItem'
import Pagination from 'src/components/blocks/Pagination'
import { useParams, useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import { getUserArticles } from 'src/store/actions/user'
import { List, makeStyles } from '@material-ui/core'
import PostSkeleton from 'src/components/skeletons/Post'
import ErrorComponent from 'src/components/blocks/Error'

interface ArticlesPathParams { page: string }

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    padding: 0,
    width: '100%',
  },
}))

const Articles = () => {
  const params = useParams() as ArticlesPathParams
  const currentPage = Number(params.page)
  const history = useHistory()
  const classes = useStyles()
  const dispatch = useDispatch()
  const isFetched = useSelector((state) => state.user.articles.fetched)
  const isFetching = useSelector((state) => state.user.articles.fetching)
  const fetchError = useSelector((state) => state.user.articles.error)
  const data = useSelector((state) => state.user.articles.data.pages[currentPage])
  const user = useSelector((state) => state.user.profile.user.data?.user)
  const pagesCount = useSelector((state) => state.user.articles.data.pagesCount)

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
    else history.push(`/user/${user.login}/articles/${i}`)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getUserArticles(user.login, currentPage))
  }, [user.login, currentPage, dispatch])

  return (
    <List className={classes.root}>
      {isFetching && [...new Array(7)].map((_, i) => <PostSkeleton key={i} />)}
      {isFetched &&
        !fetchError &&
        data &&
        data.articleIds.map((id: number) => (
          <PostItem post={data.articleRefs[id]} key={id} />
        ))}
      {fetchError && (
        <ErrorComponent
          message={fetchError.error.message}
          to={`/user/${user.login}/articles/1`}
        />
      )}
      <PaginationComponent />
    </List>
  )
}

export default Articles
