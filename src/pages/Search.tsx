import * as React from 'react'
import { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import { useLocation, useParams } from 'react-router-dom'
import { Paper, Button } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import PostItem from '../components/blocks/PostItem'
import { getSearchResults } from '../api'
import PostSkeleton from '../components/skeletons/Post'
import Pagintaion from '../components/blocks/Pagination'
import EmptySVG from '../components/svg/Empty'
import SearchSVG from '../components/svg/Search'
import { Posts } from '../interfaces'

/**
 * Custom hook for getting query from the URL
 */
const useQuery = () => new URLSearchParams(useLocation().search)

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 600,
    background: theme.palette.background.default,
  },
}))

const useSearchStyles = makeStyles((theme) => ({
  search: {
    alignItems: 'center',
    display: 'flex',
    margin: theme.spacing(2),
  },
  searchButton: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    textTransform: 'none',
    fontFamily: 'Google Sans',
    fontSize: 16,
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
    flex: 1,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 2),
    width: '100%',
  },
}))

const useSvgStyles = makeStyles((theme) => ({
  svgHolder: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%',
  },
  svgTitle: {
    fontFamily: 'Google Sans',
    fontSize: 18,
    marginTop: theme.spacing(2),
  },
  svg: {
    marginTop: theme.spacing(6),
    width: '65%',
    display: 'flex',
    justifyContent: 'center',
    '& svg': { maxWidth: 270, width: '100%', height: '100%' },
  },
}))

const useNoResultsStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%',
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

const SearchInput = ({ q }) => {
  const classes = useSearchStyles()
  const history = useHistory()

  const onSubmit = (e) => {
    e.preventDefault()
    history.push('/search/p/1?q=' + e.target.q.value)
  }

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <Paper elevation={0} className={classes.search}>
        <InputBase
          autoFocus
          name="q"
          defaultValue={q}
          placeholder={'Поиск'}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
        <Button
          type="submit"
          disableElevation
          color="primary"
          variant="contained"
          className={classes.searchButton}
        >
          Найти
        </Button>
      </Paper>
    </form>
  )
}

const NoResults = () => {
  const classes = useNoResultsStyles()
  return (
    <div className={classes.root}>
      <Typography className={classes.title}>
        К сожалению, здесь пока нет ни одной публикации
      </Typography>
      <EmptySVG className={classes.svg} />
    </div>
  )
}

const SearchResultsScreen = ({ q }) => {
  const params = useParams() as { page: string }
  const location = useLocation()
  const history = useHistory()
  const [data, setData] = useState<Posts>()
  const [fetchError, setError] = useState()
  const [currentPage, setCurrentPage] = useState<number>(Number(params.page))
  const [pagesCount, setPagesCount] = useState<number>()

  const handleChange = (_, i) => {
    if (i === currentPage) return

    setCurrentPage(i)
    setData(null)
    setError(null)
    history.push('/search/p/' + i + location.search)
  }

  useEffect(() => {
    setError(null)
    setData(null)

    const get = async () => {
      try {
        const d = await getSearchResults(q, currentPage, 'relevance')
        setData(d)
        if (!pagesCount) setPagesCount(d.pagesCount)
      } catch (e) {
        setError(e.message)
      }
    }
    get()
    // eslint-disable-next-line
  }, [q, currentPage])

  if (fetchError) return <NoResults />

  return (
    <div>
      {!data && [...new Array(7)].map((_, i) => <PostSkeleton key={i} />)}
      {data &&
        data.articleIds.map((e, i) => (
          <PostItem post={data.articleRefs[e]} key={i} />
        ))}
      <Pagintaion
        disabled={!data}
        steps={pagesCount}
        handleChange={handleChange}
      />
    </div>
  )
}

const SvgScreen = () => {
  const classes = useSvgStyles()
  const theme = useTheme()

  return (
    <div className={classes.svgHolder}>
      <Typography className={classes.svgTitle}>
        Попробуй что-нибудь поискать!
      </Typography>
      <SearchSVG theme={theme.palette.type} className={classes.svg} />
    </div>
  )
}

const Search = () => {
  const searchParams = useQuery()
  const classes = useStyles()
  const query = searchParams.get('q')

  return (
    <div className={classes.root}>
      <SearchInput q={query} />
      {query && <SearchResultsScreen q={query} />}
      {!query && <SvgScreen />}
    </div>
  )
}

export default React.memo(Search)
