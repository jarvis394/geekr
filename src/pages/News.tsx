import * as React from 'react'
import { useState, useEffect, useRef } from 'react'
import List from '@material-ui/core/List'
import { makeStyles } from '@material-ui/core/styles'
import { getNews } from '../api'
import PostSkeleton from '../components/skeletons/Post'
import PostItem from '../components/blocks/PostItem'
import Pagination from '../components/blocks/Pagination'
import { useHistory, useParams } from 'react-router-dom'
import ErrorComponent from '../components/blocks/Error'
import { Posts } from '../interfaces'

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.background.default,
    padding: 0,
    width: '100%',
    paddingTop: theme.spacing(2),
  },
}))

type NewsPathParams = { page: string }

const News = ({ state, setState }) => {
  const { cache } = state
  const params = useParams() as NewsPathParams
  let currentPage = Number(params.page)
  const [posts, setPosts] = useState<Posts>(
    cache.news.data[currentPage] || false
  )
  const [fetchError, _setError] = useState()
  const history = useHistory()
  const classes = useStyles()
  const postsRef = useRef()

  /* eslint-disable indent */
  const postsComponents = posts
    ? posts.articleIds.map((id, i) => (
        <PostItem post={posts.articleRefs[id]} key={i} />
      ))
    : [...new Array(7)].map((_, i) => <PostSkeleton key={i} />)
  /* eslint-enable indent */

  const PaginationComponent = () =>
    cache.news.pagesCount ? (
      <Pagination
        disabled={!posts}
        handleChange={handlePagination}
        steps={cache.news.pagesCount}
        currentStep={currentPage}
      />
    ) : null

  const setError = e => {
    setPosts(null)
    return _setError(e)
  }

  const handlePagination = (_, i) => {
    if (i === currentPage) return

    setPosts(cache.news.data[i])
    history.push('/news/p/' + i)
  }

  useEffect(() => {
    const get = async () => {
      let data

      // Reset error state
      setError(null)

      try {
        data = await getNews(currentPage)
      } catch (e) {
        if (e.statusCode === 404 || e.statusCode === 400)
          return setError('Нет такой страницы!')
        else return setError(e.message)
      }

      // Set component's posts data
      setPosts(data.data)

      // Set application state's posts data and the amount of pages to the state
      // so Pagination component will always have a static number of steps
      if (!cache.news.data[currentPage]) {
        setState(prev => ({
          ...prev,
          cache: {
            ...prev.cache,
            news: {
              ...prev.cache.news,
              data: {
                ...prev.cache.news.data,
                [currentPage]: {
                  articleIds: data.data.articleIds,
                  articleRefs: data.data.articleRefs,
                }
              },
              pagesCount: data.data.pagesCount,
            },
          },
        }))
      }
    }

    if (!cache.news.data[currentPage]) get()

    // eslint-disable-next-line
  }, [currentPage])

  return fetchError ? (
    <ErrorComponent
      message={fetchError}
      onHomeClick={() => {
        currentPage = 1
        setPosts(null)
        setError(null)
      }}
    />
  ) : (
    <>
      <List ref={postsRef} className={classes.root}>
        {postsComponents}
      </List>
      <PaginationComponent />
    </>
  )
}

export default News
