import React, { useState, useEffect, useRef } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles, fade } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'
import axios from 'axios'
import PostSkeleton from '../components/skeletons/Post'
import ExpandIcon from '@material-ui/icons/ArrowDropDown'
import PostItem from '../components/PostItem'
import DotStepper from '../components/Pagination'
import { useHistory, useParams, useLocation } from 'react-router-dom'
import Scrollbar from '../components/Scrollbar'
import ErrorComponent from '../components/Error'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import NewsBlock from '../components/NewsBlock'

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.background.default,
    padding: 0,
    width: '100%',
    paddingTop: theme.spacing(2),
  },
  expansionPanel: {
    margin: '0 !important',
  },
  expansionPanelSummary: {
    padding: 0,
    minHeight: '48px !important',
    height: '48px !important',
  },
  expansionPanelDetails: {
    padding: 0,
    background: fade(theme.palette.background.default, 0.4),
  },
  modeText: {
    fontSize: 14,
    fontWeight: 500,
  },
  modeListItem: {
    width: '100%',
  },
  modeTextSelected: {
    fontSize: 14,
    color: theme.palette.primary.main,
    fontWeight: 800,
  },
}))

const Home = ({ state, setState }) => {
  document.title = 'habra.'

  const location = useLocation()
  const params = useParams()

  const getMode = () => {
    const loc = location.pathname.split('/').slice(1)
    if (loc[0] === 'all') return 'all'
    else if (loc[0] === 'top' && ['day', 'week', 'month'].includes(loc[1]))
      return loc[1]
    else return false
  }

  const [posts, setPosts] = useState(
    state.posts.articleIds ? state.posts : null
  )
  const [fetchError, _setError] = useState()
  const history = useHistory()
  const classes = useStyles()
  const postsRef = useRef()
  const [mode, setMode] = useState(getMode())

  /* eslint-disable indent */
  const postsComponents = posts
    ? posts.articleIds.map((id, i) => {
        const post = posts.articleRefs[id]
        return <PostItem post={post} key={i} />
      })
    : [...new Array(7)].map((_, i) => <PostSkeleton key={i} />)
  /* eslint-enable indent */
  let currentPage = Number(params.page)

  const modes = [
    {
      text: 'Все подряд',
      to: '/all',
      mode: 'all',
    },
    {
      text: 'Лучшее за день',
      to: '/top/day',
      mode: 'day',
    },
    {
      text: 'Лучшее за неделю',
      to: '/top/week',
      mode: 'week',
    },
    {
      text: 'Лучшее за месяц',
      to: '/top/month',
      mode: 'month',
    },
  ]
  const modeUrls = {
    all: 'sort=rating',
    day: 'date=day&sort=date',
    week: 'date=week&sort=date',
    month: 'date=month&sort=date',
  }

  const getPosts = async (page, m) =>
    (
      await axios.get(
        `https://m.habr.com/kek/v1/articles/?${modeUrls[m]}&page=${page}&fl=ru&hl=ru`
      )
    ).data

  const PaginationComponent = () =>
    state.pagesCount ? (
      <DotStepper
        disabled={!posts}
        handleChange={handlePagination}
        steps={state.pagesCount}
        currentStep={currentPage}
      />
    ) : null

  const SwitcherComponent = () => {
    const current = modes.find(e => e.mode === mode)
    const buttonList = modes.map((e, i) => {
      const isCurrent = e.mode === current.mode
      const handleClick = () => {
        setMode(e.mode)
        setPosts(null)
        setState(prev => ({ ...prev, posts: {} }))
        localStorage.setItem('mode', e.mode)
        history.push(e.to + '/p/1')
      }

      return (
        <ListItem
          onClick={handleClick}
          button={!isCurrent}
          key={i}
          className={classes.modeListItem}
        >
          <ListItemText
            primaryTypographyProps={{
              className: isCurrent
                ? classes.modeTextSelected
                : classes.modeText,
            }}
          >
            {e.text}
          </ListItemText>
        </ListItem>
      )
    })

    return (
      <>
        <ExpansionPanel
          elevation={0}
          className={classes.expansionPanel}
          TransitionProps={{ unmountOnExit: true }}
        >
          <Container>
            <ExpansionPanelSummary
              className={classes.expansionPanelSummary}
              expandIcon={<ExpandIcon />}
            >
              <Typography className={classes.modeText}>
                {current.text}
              </Typography>
              <Divider />
            </ExpansionPanelSummary>
          </Container>
          <ExpansionPanelDetails className={classes.expansionPanelDetails}>
            <List style={{ width: '100%', paddingTop: 0 }}>{buttonList}</List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </>
    )
  }

  const setError = e => {
    setState(prev => ({ ...prev, posts: {} }))
    setPosts(null)
    return _setError(e)
  }

  const handlePagination = (_, i) => {
    if (i === currentPage) return
    
    setState(prev => ({ ...prev, posts: {} }))
    setPosts(null)
    history.push(modes.find(e => e.mode === mode).to + '/p/' + i)
  }

  useEffect(() => {
    const get = async () => {
      let data

      // Reset error state
      setError(null)

      try {
        data = await getPosts(currentPage, mode)
      } catch (e) {
        if (e.statusCode === 404 || e.statusCode === 400)
          return setError('Нет такой страницы!')
        else return setError(e.message)
      }

      // Set component's posts data
      setPosts(data.data)

      // Set application state's posts data
      setState(prev => ({ ...prev, posts: data.data }))

      // Set the amount of pages to the state so DotStepper will always have
      // static number of steps
      setState(prev => ({ ...prev, pagesCount: data.data.pagesCount }))
    }

    if (!state.posts.articleIds) get()

    // eslint-disable-next-line
  }, [currentPage, mode])

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
      <Scrollbar>
        <SwitcherComponent />
        <List ref={postsRef} className={classes.root}>
          {postsComponents[0]}
          {posts && currentPage === 1 && <NewsBlock />}
          {postsComponents.slice(1)}
        </List>
        <PaginationComponent />
      </Scrollbar>
    </>
  )
}

export default Home
