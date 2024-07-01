import * as React from 'react'
import { useEffect } from 'react'
import List from '@material-ui/core/List'
import { makeStyles } from '@material-ui/core/styles'
import PostSkeleton from '../components/skeletons/PostItem'
import PostItem from '../components/blocks/PostItem'
import Pagination from '../components/blocks/Pagination'
import { useHistory, useParams } from 'react-router-dom'
import ErrorComponent from '../components/blocks/Error'
import { useDispatch } from 'react-redux'
import { getNews } from 'src/store/actions/news'
import { useSelector } from 'src/hooks'
import { APP_BAR_HEIGHT, FLOWS, MIN_WIDTH } from 'src/config/constants'
import FlowsBar from 'src/components/blocks/FlowsBar'
import FlowAlias from 'src/interfaces/FlowAlias'
import { FlowObject, Posts } from 'src/interfaces'
import useQuery from 'src/hooks/useQuery'
import NotFound from './NotFound'
import MainBlock from 'src/components/blocks/MainBlock'
import Sidebar from 'src/pages/Home/Sidebar'

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    padding: 0,
    width: '100%',
    marginTop: APP_BAR_HEIGHT,
    [theme.breakpoints.up(MIN_WIDTH)]: {
      paddingTop: theme.spacing(1.5),
    },
  },
  sidebar: {
    marginTop: APP_BAR_HEIGHT + theme.spacing(1.5),
    display: 'flex',
    alignItems: 'flex-start',
    height: '100%',
  },
}))

type NewsPathParams = { page: string }

const News = () => {
  const params = useParams() as NewsPathParams
  const query = useQuery()
  const flow = (query.get('flow') || 'all') as FlowAlias

  const currentPage = Number(params.page)
  const history = useHistory()
  const classes = useStyles()
  const dispatch = useDispatch()
  const isFetched = useSelector((state) => state.news.fetched)
  const isFetching = useSelector((state) => state.news.fetching)
  const fetchError = useSelector((state) => state.news.error)
  const posts: Posts = useSelector((state) => {
    if (flow === 'all') {
      // TODO: fix types
      // @ts-expect-error temporary fix
      return state.news.data.pages[currentPage]
    } else {
      return state.news.flows[flow].pages[currentPage]
    }
  })
  const pagesCount = useSelector((state) =>
    flow === 'all'
      ? state.news.data.pagesCount
      : state.news.flows[flow].pagesCount
  )

  const PaginationComponent = () =>
    pagesCount ? (
      <Pagination
        disabled={isFetching}
        handleChange={handlePagination}
        steps={pagesCount}
        currentStep={currentPage}
      />
    ) : null

  const handlePagination = (
    _e: React.ChangeEvent<unknown>,
    i: string | number
  ) => {
    if (i === currentPage) return
    else history.push('/news/p/' + i)
  }

  const onFlowsBarLinkClick = (e: FlowObject) => {
    if (e.alias === 'all') {
      history.push('/news/p/1')
    } else {
      history.push('/news/p/1?flow=' + e.alias)
    }
  }

  useEffect(() => {
    dispatch(getNews(currentPage, flow))
    // TODO: fix deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, dispatch, flow, location.pathname, location.search])

  /** Show 404 page when 'flow' value is outside of flows aliases */
  if (!FLOWS.some((e) => e.alias === flow)) {
    return <NotFound />
  }

  return (
    <>
      <MainBlock>
        <FlowsBar onClick={onFlowsBarLinkClick} flow={flow} />
        <List className={classes.root}>
          {isFetching &&
            [...new Array(7)].map((_, i) => <PostSkeleton key={i} />)}
          {isFetched &&
            !fetchError &&
            posts &&
            posts.publicationIds?.map((i: number) => (
              <PostItem post={posts.publicationRefs[i]} key={i} />
            ))}
          {fetchError && (
            <ErrorComponent message={fetchError.error.message} to="/news/p/1" />
          )}
          <PaginationComponent />
        </List>
      </MainBlock>
      <div className={classes.sidebar}>
        <Sidebar />
      </div>
    </>
  )
}

export default React.memo(News)
