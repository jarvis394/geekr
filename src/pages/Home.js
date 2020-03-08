import React, { useState, useEffect, useRef } from 'react'
import List from '@material-ui/core/List'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { get } from 'request-promise-native'
import PostSkeleton from '../components/skeletons/Post'
import PostItem from '../components/PostItem'
import DotStepper from '../components/DotStepper'
import { useHistory, useParams, Link } from 'react-router-dom'
import Scrollbar from '../components/Scrollbar'

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.background.default,
    padding: 0,
    width: '100%',
    paddingTop: theme.spacing(2),
  },
  centered: {
    height: 'calc(100% - 48px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  googleFont: { fontFamily: 'Google Sans' },
  link: {
    textDecoration: 'underline',
    color: theme.palette.primary.main,
    fontWeight: 500,
  },
}))

const Home = ({ state, setState }) => {
  document.title = 'habra.'

  const [posts, setPosts] = useState(
    state.posts.articleIds ? state.posts : null
  )
  const [fetchError, _setError] = useState()
  const history = useHistory()
  const classes = useStyles()
  const params = useParams()
  const postsRef = useRef()
  const postsComponents = posts
    ? posts.articleIds.map((id, i) => (
        <PostItem post={posts.articleRefs[id]} key={i} />
      ))
    : [...new Array(20)].map((_, i) => <PostSkeleton key={i} />)
  let currentPage = Number(params.page)

  const ErrorComponent = () => (
    <div className={classes.centered}>
      <Typography className={classes.googleFont} variant="h6">
        {fetchError}
      </Typography>
      <Typography className={classes.googleFont} variant="h6">
        <Link to="/page/1" onClick={() => currentPage = 1} className={classes.link}>
          Домой
        </Link>
      </Typography>
    </div>
  )

  const setError = e => {
    setState(prev => ({ ...prev, posts: {} }))
    setPosts(null)
    return _setError(e)
  }

  const handleClick = i => {
    const n = i + 1
    history.push('/page/' + n)
    setState(prev => ({ ...prev, posts: {} }))
    setPosts(null)
  }

  const getPosts = page =>
    get(
      `https://m.habr.com/kek/v1/articles/?date=week&sort=date&page=${page}&fl=ru&hl=ru`,
      { json: true }
    )

  useEffect(() => {
    const get = async () => {
      let data

      try {
        data = await getPosts(currentPage)
      } catch (e) {
        if (e.statusCode === 400) return setError('Нет такой страницы!')
        else return setError(e.message)
      }

      data = data.data

      // Reset error state
      setError(null)

      // Set component's posts data
      setPosts(data)

      // Set application state's posts data
      setState(prev => ({ ...prev, posts: data }))

      // Set the amount of pages to the state so DotStepper will always have
      // static number of steps
      if (!state.pages) setState(prev => ({ ...prev, pages: data.pagesCount }))
    }

    if (!state.posts.articleIds) get()
  }, [currentPage])

  return fetchError ? (
    <ErrorComponent />
  ) : (
    <>
      <Scrollbar key={currentPage}>
        <List key={currentPage} ref={postsRef} className={classes.root}>
          {postsComponents}
        </List>
      </Scrollbar>
      {state.pages && (
        <DotStepper
          handleBack={handleClick}
          handleNext={handleClick}
          steps={state.pages}
          currentStep={currentPage - 1}
        />
      )}
    </>
  )
}

export default Home
