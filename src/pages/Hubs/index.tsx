import React, { useEffect, useRef } from 'react'
import SearchBar from './SearchBar'
import Item from './Item'
import Loader from './Loader'
import { makeStyles } from '@material-ui/core/styles'
import { List, Typography } from '@material-ui/core'
import { useSelector } from 'src/hooks'
import { useDispatch } from 'react-redux'
import { getHubsList, getHubsSearchResults } from 'src/store/actions/hubs'
import { useParams, useHistory, useLocation } from 'react-router-dom'
import ErrorComponent from 'src/components/blocks/Error'
import EmptySVG from 'src/components/svg/Empty'
import { HUBS_PREFIX } from 'src/store/reducers/hubs/types'
import Pagination from 'src/components/blocks/Pagination'
import OutsidePage from 'src/components/blocks/OutsidePage'
import getContrastPaperColor from 'src/utils/getContrastPaperColor'
import getInvertedContrastPaperColor from 'src/utils/getInvertedContrastPaperColor'
import useQuery from 'src/hooks/useQuery'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  list: {
    backgroundColor: getContrastPaperColor(theme),
    marginTop: theme.spacing(-1),
    paddingTop: 0,
  },
  pagination: {
    paddingTop: theme.spacing(2),
    backgroundColor: getInvertedContrastPaperColor(theme),
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
    maxWidth: '75%',
  },
  svg: {
    marginTop: theme.spacing(4),
    width: '65%',
    display: 'flex',
    justifyContent: 'center',
    '& svg': { maxWidth: 400, width: '100%', height: '100%' },
  },
}))

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
  const location = useLocation()
  const classes = useStyles()
  const params = useParams<{ page: string }>()
  const currentPage = Number(params.page)
  const isFetching = useSelector((state) => state.hubs.fetching)
  const isFetched = useSelector((state) => state.hubs.fetched)
  const fetchError = useSelector((state) => state.hubs.error)
  const pagesCount = useSelector((state) => state.hubs.data.pagesCount)
  // TODO: fix types
  //@ts-expect-error temporary fix
  const data = useSelector((state) => state.hubs.data.pages[currentPage])
  const storeSearchResults = useSelector((state) => state.hubs.searchResults)
  const inputRef = useRef<HTMLInputElement>(null)
  const searchParams = useQuery()
  const query = searchParams.get('q')
  const headerText = query ? '"' + query + '"' : 'Хабы'

  const search = () => {
    const currentQuery = inputRef.current ? inputRef.current.value : null

    if (!currentQuery || currentQuery === '')
      return dispatch({ type: HUBS_PREFIX + 'SEARCH_CLEAR' })
    if (!currentQuery || currentQuery.length <= 3 || query === currentQuery)
      return false

    dispatch(getHubsSearchResults(currentQuery))
    history.replace('/hubs/p/1?q=' + currentQuery, {
      from: location.pathname,
    })

    return true
  }

  const handlePagination = (_e: React.ChangeEvent<unknown>, i: number) => {
    if (i === currentPage) return
    history.replace('/hubs/p/' + i)
  }

  useEffect(() => {
    const currentQuery = inputRef.current ? inputRef.current.value : null
    if (currentQuery) {
      dispatch(getHubsSearchResults(currentQuery))
    } else {
      dispatch(getHubsList(currentPage))
    }
  }, [currentPage, dispatch])

  return fetchError ? (
    <ErrorComponent message={fetchError.error.message} />
  ) : (
    <OutsidePage headerText={headerText} hidePositionBar disableShrinking>
      <div className={classes.root}>
        <SearchBar inputRef={inputRef} onSubmit={search} />
        <List className={classes.list}>
          {isFetching && <Loader />}
          {isFetched &&
            query &&
            storeSearchResults.length !== 0 &&
            storeSearchResults.hubIds.map((e: string, i: number) => (
              <Item data={storeSearchResults.hubRefs[e]} key={i} />
            ))}
          {isFetched && query && storeSearchResults.pagesCount === 0 && (
            <NoResults />
          )}
          {isFetched &&
            !query &&
            data &&
            data.hubIds.map((e: string, i: number) => (
              <Item data={data.hubRefs[e]} key={i} />
            ))}
        </List>
        {pagesCount && !query && (
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
    </OutsidePage>
  )
}

export default React.memo(Hubs)
