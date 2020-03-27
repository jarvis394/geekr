import * as React from 'react'
import { useState, useEffect, useRef } from 'react'
import List from '@material-ui/core/List'
import { makeStyles } from '@material-ui/core/styles'
import { getPosts } from '../../api'
import PostSkeleton from '../../components/skeletons/Post'
import PostItem from '../../components/blocks/PostItem'
import Pagination from '../../components/blocks/Pagination'
import { useHistory, useParams } from 'react-router-dom'
import Scrollbar from '../../components/Scrollbar'
import ErrorComponent from '../../components/blocks/Error'
import NewsBlock from '../../components/blocks/NewsBlock'
import { Mode } from '../../api/getPosts'
import useLastMode from '../../utils/useLastMode'
import { Posts } from '../../interfaces'
import { MODES as modes } from '../../config/constants'
import Switcher from './Switcher'
import TabsComponent from './Tabs'

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.background.default,
    padding: 0,
    width: '100%',
    paddingTop: theme.spacing(2),
  },
}))

type HomePathParams = { page: string }

const Home = ({ state, setState }) => {
  document.title = 'habra.'

  const { cache } = state
  const params = useParams() as HomePathParams
  const lastSelectedMode = useLastMode()
  const [mode, setMode] = useState<Mode>(lastSelectedMode)
  let currentPage = Number(params.page)
  const [posts, setPosts] = useState<Posts>(
    cache[mode].data[currentPage] || false
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
    cache[mode].pagesCount ? (
      <Pagination
        disabled={!posts}
        handleChange={handlePagination}
        steps={cache[mode].pagesCount}
        currentStep={currentPage}
      />
    ) : null

  const setError = e => {
    setPosts(null)
    return _setError(e)
  }

  const handlePagination = (_, i) => {
    if (i === currentPage) return

    setPosts(cache[mode].data[i])
    history.push(modes.find(e => e.mode === mode).to + '/p/' + i)
  }

  const handleSwitcher = ({ mode: newMode, to }) => {
    localStorage.setItem('mode', newMode)
    history.push(to + '/p/1')
    setPosts(cache[newMode].data[1])
    setMode(newMode)
  }

  useEffect(() => {
    const get = async () => {
      let data

      // Reset error state
      setError(null)

      try {
        data = await getPosts(mode, currentPage)
      } catch (e) {
        if (e.statusCode === 404 || e.statusCode === 400)
          return setError('Нет такой страницы!')
        else return setError(e.message)
      }

      // Set component's posts data
      setPosts(data.data)

      // Set application state's posts data and the amount of pages to the state
      // so Pagination component will always have a static number of steps
      if (!cache[mode].data[currentPage]) {
        setState(prev => ({
          ...prev,
          cache: {
            ...prev.cache,
            [mode]: {
              ...prev.cache[mode],
              data: {
                ...prev.cache[mode].data,
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

    if (!cache[mode].data[currentPage]) get()

    // eslint-disable-next-line
  }, [currentPage, mode])

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
      <Scrollbar>
        <TabsComponent />
        <Switcher setMode={setMode} mode={mode} handleClick={handleSwitcher} />
        <List ref={postsRef} className={classes.root}>
          {postsComponents[0]}
          {posts && currentPage === 1 && <NewsBlock state={state} setState={setState} />}
          {postsComponents.slice(1)}
        </List>
        <PaginationComponent />
      </Scrollbar>
    </>
  )
}

export default Home
