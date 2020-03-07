import React, { useState, useEffect } from 'react'
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
    // overflow: 'auto',
    background: theme.palette.background.default,
    padding: 0,
    width: '100%',
    // maxHeight: '100%',
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
  const [posts, setPosts] = useState(
    state.posts.articleIds ? state.posts : null
  )
  const [fetchError, _setError] = useState()
  const history = useHistory()
  const classes = useStyles()
  const params = useParams()
  const postsComponents = posts
    ? posts.articleIds.map((id, i) => (
        <PostItem post={posts.articleRefs[id]} key={i} />
      ))
    : [...new Array(20)].map((_, i) => <PostSkeleton key={i} />)
  let currentPage = Number(params.page) - 1

  const ErrorComponent = () => (
    <div className={classes.centered}>
      <Typography className={classes.googleFont} variant="h6">
        {fetchError}
      </Typography>
      <Typography className={classes.googleFont} variant="h6">
        <Link to="/page/1" className={classes.link}>
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

  document.title = 'habra.'

  useEffect(() => {
    const get = async () => {
      let data

      try {
        data = await getPosts(currentPage + 1)
      } catch (e) {
        console.log(e)
        return setError(e.message)
      }

      if (!data.success) {
        return setError('Нет такой страницы!')
      }

      data = data.data
      setError(null)
      setPosts(data)
      setState(prev => ({ ...prev, posts: data }))

      if (!state.pages) setState(prev => ({ ...prev, pages: data.pagesCount }))
    }

    if (!state.posts.articleIds) get()
  }, [currentPage])

  return fetchError ? (
    <ErrorComponent />
  ) : (
    <>
      <Scrollbar>
        <List className={classes.root}>{postsComponents}</List>
      </Scrollbar>
      {state.pages && (
        <DotStepper
          handleBack={handleClick}
          handleNext={handleClick}
          steps={state.pages}
          currentStep={currentPage}
        />
      )}
    </>
  )
}

export default Home
