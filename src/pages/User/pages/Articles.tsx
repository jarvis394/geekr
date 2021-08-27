import React, { useEffect } from 'react'
import { useSelector } from 'src/hooks'
import PostItem from 'src/components/blocks/PostItem'
import Pagination from 'src/components/blocks/Pagination'
import { useParams, useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import { getProfileCard, getProfileArticles } from 'src/store/actions/profile'
import { List, makeStyles, useTheme } from '@material-ui/core'
import PostSkeleton from 'src/components/skeletons/PostItem'
import ErrorComponent from 'src/components/blocks/Error'
import OutsidePage from 'src/components/blocks/OutsidePage'
import { UserParams } from '..'

interface ArticlesPathParams {
  page: string
}

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    padding: 0,
    width: '100%',
  },
}))

const UserArticles = () => {
  const params = useParams() as ArticlesPathParams
  const currentPage = Number(params.page)
  const history = useHistory()
  const classes = useStyles()
  const theme = useTheme()
  const dispatch = useDispatch()
  const isProfileFetched = useSelector(
    (state) => state.profile.profile.card.fetched
  )
  const isFetched = useSelector((state) => state.profile.articles.fetched)
  const isFetching = useSelector((state) => state.profile.articles.fetching)
  const fetchError = useSelector((state) => state.profile.articles.error)
  const data = useSelector(
    (state) => state.profile.articles.data.pages[currentPage]
  )
  const profile = useSelector((state) => state.profile.profile.card.data)
  const pagesCount = useSelector(
    (state) => state.profile.articles.data.pagesCount
  )
  const { login } = useParams<UserParams>()

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
    else history.replace(`/user/${login}/articles/${i}`)
  }

  useEffect(() => {
    if (!isProfileFetched) {
      dispatch(getProfileCard(login))
    } else {
      dispatch(getProfileArticles(login, currentPage))
    }
  }, [profile, currentPage, dispatch])

  return (
    <OutsidePage
      headerText={'Публикации'}
      hidePositionBar
      backgroundColor={theme.palette.background.paper}
      shrinkedBackgroundColor={theme.palette.background.paper}
      shrinkedHeaderText={'Публикации'}
    >
      <List className={classes.root}>
        {isFetching &&
          [...new Array(4)].map((_, i) => <PostSkeleton key={i} />)}
        {isFetched &&
          !fetchError &&
          data &&
          data.articleIds.map((id: number) => (
            <PostItem post={data.articleRefs[id]} key={id} />
          ))}
        {fetchError && <ErrorComponent message={fetchError.error.message} />}
        <PaginationComponent />
      </List>
    </OutsidePage>
  )
}

export default React.memo(UserArticles)
