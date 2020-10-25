import React, { useEffect, useRef } from 'react'
import SearchBar from './SearchBar'
import Item from './Item'
import Loader from './Loader'
import { makeStyles } from '@material-ui/core/styles'
import { List, Typography } from '@material-ui/core'
import { useParams, useHistory } from 'react-router-dom'
import { HubObject } from 'src/interfaces'
import ErrorComponent from 'src/components/blocks/Error'
import EmptySVG from 'src/components/svg/Empty'
import { getHubsSearchResults } from 'src/store/actions/hubs'
import { HUBS_PREFIX } from 'src/store/reducers/hubs/types'
import Pagination from 'src/components/blocks/Pagination'

const useStyles = makeStyles((theme) => ({
  list: {
    backgroundColor: theme.palette.background.paper,
  },
  pagination: {
    paddingTop: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
  },
}))

const useNoResultsStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%',
    minHeight: 600,
  },
  title: {
    fontFamily: 'Google Sans',
    fontSize: 18,
    textAlign: 'center',
  },
  svg: {
    marginTop: theme.spacing(4),
    width: '65%',
    display: 'flex',
    justifyContent: 'center',
    '& svg': { maxWidth: 400, width: '100%', height: '100%' },
  },
}))

const THRESHOLD = 1000

const NoResults = () => {
  const classes = useNoResultsStyles()
  return (
    <div className={classes.root}>
      <Typography className={classes.title}>
        К сожалению, по запросу ничего не нашлось
      </Typography>
      <EmptySVG className={classes.svg} />
    </div>
  )
}

const Hubs = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles()
  const params = useParams<{ page: string }>()
  const currentPage = Number(params.page)
  const isFetching = useSelector((state) => state.hubs.fetching)
  const isFetched = useSelector((state) => state.hubs.fetched)
  const fetchError = useSelector((state) => state.hubs.error)
  const pagesCount = useSelector((state) => state.hubs.data.pagesCount)
  const data = useSelector((state) => state.hubs.data.pages[currentPage])
  const storeSearchQuery = useSelector((state) => state.hubs.search)
  const storeSearchResults = useSelector((state) => state.hubs.searchResults)
  const inputRef = useRef<HTMLInputElement>()
  let searchTimer: NodeJS.Timeout

  const search = () => {
    clearTimeout(searchTimer)
    const query = inputRef.current ? inputRef.current.value : null

    if (!query || query === '')
      return dispatch({ type: HUBS_PREFIX + 'SEARCH_CLEAR' })
    if (!query || query.length <= 3 || storeSearchQuery === query) return false

    searchTimer = setTimeout(
      () => dispatch(getHubsSearchResults(query)),
      THRESHOLD
    )

    return true
  }

  const handlePagination = (_: never, i: number) => {
    if (i === currentPage) return
    history.push('/hubs/p/' + i)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getHubsList(currentPage))
  }, [currentPage, dispatch])

  return fetchError ? (
    <ErrorComponent message={fetchError.error.message} />
  ) : (
    <div>
      <SearchBar inputRef={inputRef} onChange={search} />
      <List className={classes.list}>
        {isFetching && <Loader />}
        {isFetched &&
          storeSearchQuery &&
          storeSearchResults.length !== 0 &&
          storeSearchResults.map((e: HubObject, i: number) => (
            <Item data={e} key={i} />
          ))}
        {isFetched && storeSearchQuery && storeSearchResults.length === 0 && (
          <NoResults />
        )}
        {isFetched &&
          !storeSearchQuery &&
          data &&
          data.map((e: HubObject, i: number) => <Item data={e} key={i} />)}
      </List>
      {pagesCount && !storeSearchQuery && (
        <div className={classes.pagination}>
          <Pagination
            disabled={isFetching}
            steps={pagesCount}
            handleChange={handlePagination}
            currentStep={currentPage}
          />
        </div>
      )}
    </div>
  )
}

export default React.memo(Hubs)
