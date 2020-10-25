import * as React from 'react'
import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { List } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PostSkeleton from 'src/components/skeletons/Post'
import PostItem from 'src/components/blocks/PostItem'
import Pagination from 'src/components/blocks/Pagination'
import ErrorComponent from 'src/components/blocks/Error'
import NewsBlock from 'src/components/blocks/NewsBlock'
import { Mode } from 'src/api/getPosts'
import useLastMode from 'src/utils/useLastMode'
import { MODES as modes } from 'src/config/constants'
import Switcher from './Switcher'

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    padding: 0,
    paddingTop: theme.spacing(2),
    width: '100%',
  },
}))

type HomePathParams = { page: string }

const Home = () => {
  document.title = 'habra.'

  const params = useParams() as HomePathParams
  const lastSelectedMode = useLastMode()
  const [mode, setMode] = useState<Mode>(lastSelectedMode)
  const currentPage = Number(params.page)
  const history = useHistory()
  const classes = useStyles()
  const dispatch = useDispatch()
  const isFetched = useSelector((state) => state.home.fetched)
  const isFetching = useSelector((state) => state.home.fetching)
  const fetchError = useSelector((state) => state.home.error)
  const posts = useSelector((state) => state.home.data[mode].pages[currentPage])
  const pagesCount = useSelector((state) => state.home.data[mode].pagesCount)

  const PaginationComponent = () =>
    pagesCount ? (
      <Pagination
        disabled={!posts}
        handleChange={handlePagination}
        steps={pagesCount}
        currentStep={currentPage}
      />
    ) : null

  const postsComponents =
    posts &&
    posts.articleIds.map((id, i) => (
      <PostItem post={posts.articleRefs[id]} key={i} />
    ))

  const handlePagination = (_, i) => {
    if (i === currentPage) return
    history.push(modes.find((e) => e.mode === mode).to + '/p/' + i)
  }

  const handleSwitcher = ({ mode: newMode, to }) => {
    localStorage.setItem('mode', newMode)
    history.push(to + '/p/1')
    setMode(newMode)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getPosts(mode, currentPage))
  }, [currentPage, mode, dispatch])

  return (
    <>
      <Switcher setMode={setMode} mode={mode} handleClick={handleSwitcher} />
      <List className={classes.root}>
        {isFetching &&
          [...new Array(7)].map((_, i) => <PostSkeleton key={i} />)}
        {isFetched && !fetchError && posts && (
          <>
            {postsComponents[0]}
            {currentPage === 1 && <NewsBlock />}
            {postsComponents.slice(1)}
          </>
        )}
        {fetchError && <ErrorComponent message={fetchError.error.message} />}
        <PaginationComponent />
      </List>
    </>
  )
}

export default React.memo(Home)
