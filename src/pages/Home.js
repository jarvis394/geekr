import React, { useState, useEffect, useRef, useMemo } from 'react'
import List from '@material-ui/core/List'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { get } from 'request-promise-native'
import PostSkeleton from '../components/skeletons/Post'
import ExpandIcon from '@material-ui/icons/ArrowDropDown'
import PostItem from '../components/PostItem'
import DotStepper from '../components/DotStepper'
import { useHistory, useParams, Link } from 'react-router-dom'
import Scrollbar from '../components/Scrollbar'
import ErrorComponent from '../components/Error'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.background.default,
    padding: 0,
    width: '100%',
    paddingTop: theme.spacing(2),
  },
  expansionPanel: {
    
  },
  expansionPanelSummary: {
    height: 48,
  },
}))

const getPosts = page =>
  get(
    `https://m.habr.com/kek/v1/articles/?date=week&sort=date&page=${page}&fl=ru&hl=ru`,
    { json: true }
  )

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

  /* eslint-disable indent */
  const postsComponents = posts
    ? posts.articleIds.map((id, i) => {
        const post = posts.articleRefs[id]
        return <PostItem post={post} key={i} />
      })
    : [...new Array(20)].map((_, i) => <PostSkeleton key={i} />)
  /* eslint-enable indent */
  let currentPage = Number(params.page)

  const DotStepperComponent = () =>
    state.pagesCount ? (
      <DotStepper
        disabled={!posts}
        handleBack={handleClick}
        handleNext={handleClick}
        steps={state.pagesCount}
        currentStep={currentPage - 1}
      />
    ) : null

  const SwitcherComponent = () => {
    return (
      <ExpansionPanel
        elevation={0}
        className={classes.expansionPanel}
        TransitionProps={{ unmountOnExit: true }}
      >
        <ExpansionPanelSummary className={classes.expansionPanelSummary} expandIcon={<ExpandIcon />}>
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <Typography>Panel</Typography>
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
            lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }

  const setError = e => {
    setState(prev => ({ ...prev, posts: {} }))
    setPosts(null)
    return _setError(e)
  }

  const handleClick = i => {
    const n = i + 1
    setState(prev => ({ ...prev, posts: {} }))
    setPosts(null)
    history.push('/page/' + n)
  }

  useEffect(() => {
    const get = async () => {
      let data

      // Reset error state
      setError(null)

      try {
        data = await getPosts(currentPage)
      } catch (e) {
        if (e.statusCode === 400) return setError('Нет такой страницы!')
        else return setError(e.message)
      }

      // Set component's posts data
      setPosts(data.data)

      // Set application state's posts data
      setState(prev => ({ ...prev, posts: data.data }))

      // Set the amount of pages to the state so DotStepper will always have
      // static number of steps
      if (!state.pagesCount)
        setState(prev => ({ ...prev, pagesCount: data.data.pagesCount }))
    }

    if (!state.posts.articleIds) get()
  }, [currentPage])

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
      <SwitcherComponent />
      <Scrollbar>
        <List key={currentPage} ref={postsRef} className={classes.root}>
          {postsComponents}
        </List>
      </Scrollbar>
      <DotStepperComponent />
    </>
  )
}

export default Home
