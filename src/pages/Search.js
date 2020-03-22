import React, { useState, useEffect, useRef } from 'react'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import { useLocation } from 'react-router-dom'
import { Paper, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import PostItem from '../components/PostItem'
import { ReactSVG } from 'react-svg'
import axios from 'axios'
import Scrollbar from '../components/Scrollbar'
import PostSkeleton from '../components/skeletons/Post'

/**
 * Custom hook for getting query from the URL
 */
const useQuery = () => new URLSearchParams(useLocation().search)

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    background: theme.palette.background.default,
  },
}))

const useSearchStyles = makeStyles(theme => ({
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

const useSvgStyles = makeStyles(theme => ({
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
  },
  svg: {
    marginTop: theme.spacing(4),
    width: '65%',
    display: 'flex',
    justifyContent: 'center',
    '& svg': { maxWidth: 400, width: '100%', height: '100%' },
  },
}))

const useNoResultsStyles = makeStyles(theme => ({
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
    textAlign: 'center'
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

  const onSubmit = e => {
    e.preventDefault()
    history.push('/search?q=' + e.target.q.value)
  }

  return (
    <form onSubmit={e => onSubmit(e)}>
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
      <Typography className={classes.title}>К сожалению, здесь пока нет ни одной публикации</Typography>
      <ReactSVG className={classes.svg} src="/empty.svg" />
    </div>
  )
}

const SearchResultsScreen = ({ q }) => {
  const [data, setData] = useState()
  const [fetchError, setError] = useState()

  const getSearchResults = async q =>
    (
      await axios.get(
        `https://m.habr.com/kek/v1/articles/?query=${q}&fl=ru&hl=ru`
      )
    ).data

  useEffect(() => {
    setError(null)
    const get = async () => {
      try {
        const d = await getSearchResults(q)
        setData(d.data)
      } catch (e) {
        setError(e.message)
      }
    }
    get()
  }, [q])

  if (fetchError) return <NoResults />
  if (!data) return [...new Array(7)].map((_, i) => <PostSkeleton key={i} />)

  return (
    <div>
      {data.articleIds.map((e, i) => (
        <PostItem showPreview post={data.articleRefs[e]} key={i} />
      ))}
    </div>
  )
}

const SvgScreen = () => {
  const classes = useSvgStyles()

  return (
    <div className={classes.svgHolder}>
      <Typography className={classes.svgTitle}>
        Попробуй что-нибудь поискать!
      </Typography>
      <ReactSVG className={classes.svg} src="search.svg" />
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

export default Search
