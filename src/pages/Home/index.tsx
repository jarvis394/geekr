import * as React from 'react'
import { useState, useEffect } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { List } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PostSkeleton from 'src/components/skeletons/PostItem'
import PostItem from 'src/components/blocks/PostItem'
import Pagination from 'src/components/blocks/Pagination'
import ErrorComponent from 'src/components/blocks/Error'
import NewsBlock from 'src/pages/Home/NewsBlock'
import {
  APP_BAR_HEIGHT,
  DEFAULT_POST_ITEM_HEIGHT,
  FLOWS,
  Mode,
  RATING_MODES as modes,
  RATING_MODES,
} from 'src/config/constants'
import Switcher from './Switcher'
import { useDispatch } from 'react-redux'
import { getPosts, setPostItemSize } from 'src/store/actions/home'
import { useSelector } from 'src/hooks'
import getCachedMode from 'src/utils/getCachedMode'
import AdvertsBlock from './AdvertsBlock'
import MainBlock from 'src/components/blocks/MainBlock'
import Sidebar from 'src/pages/Home/Sidebar'
import useLastMode from 'src/hooks/useLastMode'
import FlowsBar from 'src/components/blocks/FlowsBar'
import useQuery from 'src/hooks/useQuery'
import NotFound from '../NotFound'
import FlowAlias from 'src/interfaces/FlowAlias'
import { FlowObject } from 'src/interfaces'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '100%',
    width: '100%',
    marginTop: APP_BAR_HEIGHT + 1,
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: theme.spacing(1),
  },
  list: {
    background: theme.palette.background.default,
    padding: 0,
    width: '100%',
  },
}))

type HomePathParams = { page: string }

const isServerUpdateError = (message: string) => message === 'Network Error'

const Home = () => {
  const params = useParams<HomePathParams>()
  const query = useQuery()
  const flow = (query.get('flow') || 'all') as FlowAlias

  /** Show 404 page when 'flow' value is outside of flows aliases */
  if (!FLOWS.some((e) => e.alias === flow)) {
    return <NotFound />
  }

  const lastSelectedMode = getCachedMode()
  const paramsMode = useLastMode()
  const [mode, setMode] = useState<Mode>(paramsMode || lastSelectedMode.mode)
  const currentPage = Number(params.page)
  const history = useHistory()
  const location = useLocation()
  const classes = useStyles()
  const dispatch = useDispatch()
  const postItemsSizesMap = useSelector((store) => store.home.sizesMap)
  const lastAllFlowsModeName = useSelector((state) => state.home.mode)
  const lastAllFlowsMode = RATING_MODES.find(
    (e) => e.mode === lastAllFlowsModeName
  )
  const isFetched = useSelector((state) =>
    flow === 'all' ? state.home.fetched : state.home.flows.fetched
  )
  const isFetching = useSelector((state) =>
    flow === 'all' ? state.home.fetching : state.home.flows.fetching
  )
  const fetchError = useSelector((state) =>
    flow === 'all' ? state.home.error : state.home.flows.error
  )
  const posts = useSelector((state) =>
    flow === 'all'
      ? state.home.data[mode].pages[currentPage]
      : state.home.flows.data[flow][mode].pages[currentPage]
  )
  const pagesCount = useSelector((state) =>
    flow === 'all'
      ? state.home.data[mode].pagesCount
      : state.home.flows.data[flow][mode].pagesCount
  )
  const fetchErrorMessage = isServerUpdateError(fetchError?.error?.message)
    ? 'Идут технические работы'
    : fetchError?.error?.message
  const fetchErrorCode = isServerUpdateError(fetchError?.error?.message)
    ? 503
    : fetchError?.error?.code

  const PaginationComponent = () =>
    pagesCount ? (
      <Pagination
        disabled={!posts}
        handleChange={handlePagination}
        steps={pagesCount}
        currentStep={currentPage}
      />
    ) : null

  const setPostItemSizeWrapper = (id: number | string, size: number) => {
    !postItemsSizesMap[id] && dispatch(setPostItemSize(id, size))
  }
  const getPostItemSize = (id: number | string) => {
    return postItemsSizesMap[id] || DEFAULT_POST_ITEM_HEIGHT
  }
  const postsComponents =
    posts &&
    posts.articleIds.map((id, i) => (
      <PostItem
        key={i}
        setPostItemSize={setPostItemSizeWrapper}
        getPostItemSize={getPostItemSize}
        post={posts.articleRefs[id]}
      />
    ))

  const handlePagination = (_, i) => {
    if (i === currentPage) return
    history.push(
      modes.find((e) => e.mode === mode).to + 'p/' + i + '?' + query.toString()
    )
  }

  const handleSwitcher = React.useCallback(
    ({ mode: newMode, to }) => {
      localStorage.setItem('mode', newMode)
      setMode(newMode)
      history.push(to + 'p/1?' + query.toString())
    },
    [flow, location.pathname, location.search]
  )

  const onFlowsBarLinkClick = (e: FlowObject) => {
    if (e.alias === 'all') {
      history.push(lastAllFlowsMode.to + '/p/1')
    } else {
      history.push('/all/p/1?flow=' + e.alias)
    }
  }

  useEffect(() => {
    if (paramsMode !== mode) setMode(paramsMode)
    dispatch(getPosts({ mode, page: currentPage, flow }))
  }, [paramsMode, mode, flow, currentPage, location.pathname, location.search])

  return (
    <div className={classes.root}>
      <FlowsBar onClick={onFlowsBarLinkClick} flow={flow} />
      {currentPage === 1 && <AdvertsBlock />}
      <Switcher
        flow={flow}
        setMode={setMode}
        mode={mode}
        handleClick={handleSwitcher}
      />

      <div className={classes.flexContainer}>
        <MainBlock>
          <List className={classes.list}>
            {isFetching &&
              [...new Array(4)].map((_, i) => <PostSkeleton key={i} />)}
            {isFetched && !fetchError && posts && (
              <>
                {postsComponents[0]}
                {currentPage === 1 && <NewsBlock />}
                {postsComponents.slice(1)}
              </>
            )}
            {fetchError && (
              <ErrorComponent
                code={fetchErrorCode}
                message={fetchErrorMessage}
              />
            )}
            <PaginationComponent />
          </List>
        </MainBlock>
        <Sidebar />
      </div>
    </div>
  )
}

export default React.memo(Home)
