import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useSelector from 'src/hooks/useSelector'
import fadedLinearGradient from 'src/utils/fadedLinearGradient'
import {
  Avatar,
  ButtonBase,
  darken,
  lighten,
  List,
  Typography,
  useTheme,
} from '@material-ui/core'
import Switcher from 'src/pages/Home/Switcher'
import { Mode, RATING_MODES as modes } from 'src/config/constants'
import ErrorComponent from 'src/components/blocks/Error'
import Pagination from 'src/components/blocks/Pagination'
import PostItem from 'src/components/blocks/PostItem'
import PostSkeleton from 'src/components/skeletons/PostItem'
import { FetchingState } from 'src/interfaces'
import NewsBlock from 'src/pages/Home/NewsBlock'
import { useHistory, useParams } from 'react-router'
import { HubParams } from '..'
import { getHubPosts } from 'src/store/actions/hub'
import { useDispatch } from 'react-redux'

import { Icon28Users3Outline } from '@vkontakte/icons'
import { Icon24WorkOutline } from '@vkontakte/icons'
import LinkToOutsidePage from 'src/components/blocks/LinkToOutsidePage'
import isDarkTheme from 'src/utils/isDarkTheme'
import SubscribeButton from 'src/components/blocks/SubscribeButton'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  topBlock: {
    background: fadedLinearGradient(theme),
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    paddingBottom: 0,
  },
  mainBlock: {
    backgroundColor: theme.palette.background.default,
  },
}))

const useInformationStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: theme.spacing(2),
  },
  avatar: {
    width: 64,
    height: 64,
    marginRight: theme.spacing(2),
  },
  rating: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  caption: {
    fontSize: 12,
    color: theme.palette.text.hint,
  },
  ratingText: {
    fontSize: 18,
    color: theme.palette.primary.main,
    fontWeight: 500,
  },
  avatarAndRating: {
    flexGrow: 1,
    display: 'flex',
  },
}))

const useDescriptionStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2),
  },
  title: {
    fontFamily: 'Google Sans',
    fontSize: 24,
    fontWeight: 700,
    marginBottom: theme.spacing(0.5),
  },
  description: {
    fontSize: 14,
  },
}))

const useLinksStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: theme.spacing(2),
  },
  button: {
    boxShadow:
      '0px 1px 5px -1px rgb(0 0 0 / 7%), 0px 5px 8px 0px rgb(0 0 0 / 4%)',
    borderRadius: 8,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    textAlign: 'left',
    background: theme.palette.background.paper,
    '&:nth-child(1)': {
      marginRight: theme.spacing(1),
    },
    '&:nth-child(2)': {
      marginLeft: theme.spacing(1),
    },
  },
  link: {
    padding: theme.spacing(1, 1.5),
    color: theme.palette.text.primary,
    textDecoration: 'none',
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 500,
    fontFamily: 'Google Sans',
    flexGrow: 1,
    marginLeft: theme.spacing(1),
  },
}))

const usePostsStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 0,
  },
})

const Information = () => {
  const profile = useSelector((state) => state.hub.profile.data)
  const [isSubscribed, setSubscribed] = useState(
    profile?.relatedData?.isSubscribed || false
  )
  const classes = useInformationStyles()
  const theme = useTheme()

  return (
    <div className={classes.root}>
      <div className={classes.avatarAndRating}>
        <Avatar
          alt={profile.titleHtml}
          src={profile.imageUrl}
          className={classes.avatar}
        />
        <div className={classes.rating}>
          <Typography className={classes.ratingText}>
            {profile.statistics.rating}
          </Typography>
          <Typography className={classes.caption}>Рейтинг</Typography>
        </div>
      </div>
      <SubscribeButton
        isSubscribed={isSubscribed}
        setSubscribed={setSubscribed}
        backgroundColor={
          theme.palette.background[isDarkTheme(theme) ? 'default' : 'paper']
        }
      />
    </div>
  )
}

const Description = () => {
  const profile = useSelector((state) => state.hub.profile.data)
  const classes = useDescriptionStyles()

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>{profile.titleHtml}</Typography>
      <Typography className={classes.description}>
        {profile.descriptionHtml}
      </Typography>
    </div>
  )
}

const Links = () => {
  const { alias } = useParams<HubParams>()
  const classes = useLinksStyles()

  return (
    <div className={classes.root}>
      <ButtonBase className={classes.button}>
        <LinkToOutsidePage
          className={classes.link}
          to={'/hub/' + alias + '/authors/p/1'}
        >
          <Icon28Users3Outline />
          <Typography className={classes.text}>Авторы</Typography>
        </LinkToOutsidePage>
      </ButtonBase>
      <ButtonBase className={classes.button}>
        <LinkToOutsidePage
          className={classes.link}
          to={'/hub/' + alias + '/companies/p/1'}
        >
          <Icon24WorkOutline />
          <Typography className={classes.text}>Компании</Typography>
        </LinkToOutsidePage>
      </ButtonBase>
    </div>
  )
}

const Posts = ({ mode }) => {
  const classes = usePostsStyles()
  const { alias } = useParams<HubParams>()
  const data = useSelector((state) => state.hub.posts.data)
  const fetchState = useSelector((state) => state.hub.posts.state)
  const fetchError = useSelector((state) => state.hub.posts.fetchError)
  const pagesCount = useSelector((state) => state.hub.posts.data?.pagesCount)
  const params = useParams<{ page: string }>()
  const currentPage = Number(params.page)
  const history = useHistory()
  const postsComponents =
    data &&
    data.articleIds.map((id, i) => (
      <PostItem key={id} post={data.articleRefs[id]} />
    ))
  const PaginationComponent = () =>
    pagesCount ? (
      <Pagination
        disabled={!data}
        handleChange={handlePagination}
        steps={pagesCount}
        currentStep={currentPage}
      />
    ) : null

  const handlePagination = (_, i) => {
    const currentModeObject = modes.find((e) => e.mode === mode)
    if (i === currentPage) return
    if (currentModeObject.mode === 'all') {
      history.replace('/hub/' + alias + '/p/' + i)
    } else {
      history.replace('/hub/' + alias + currentModeObject.to + '/p/' + i)
    }
  }

  return (
    <List className={classes.root}>
      {fetchState === FetchingState.Fetching &&
        [...new Array(4)].map((_, i) => <PostSkeleton key={i} />)}
      {fetchState === FetchingState.Fetched && data && (
        <>
          {postsComponents[0]}
          {currentPage === 1 && <NewsBlock hubAlias={alias} />}
          {postsComponents.slice(1)}
        </>
      )}
      {fetchError && <ErrorComponent message="Не удалось получить статьи" />}
      <PaginationComponent />
    </List>
  )
}

const Profile = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { alias } = useParams<HubParams>()
  const [mode, setMode] = useState<Mode>('all')
  const history = useHistory()
  const params = useParams<{ page: string }>()
  const currentPage = Number(params.page)

  const handleSwitcher = React.useCallback(
    ({ mode: newMode, to }) => {
      setMode(newMode)
      if (newMode === 'all') {
        history.replace('/hub/' + alias + '/p/1')
      } else {
        history.replace('/hub/' + alias + to + '/p/1')
      }
    },
    [history]
  )

  useEffect(() => {
    dispatch(getHubPosts(mode, currentPage, alias))
  }, [mode, currentPage, alias])

  return (
    <div className={classes.root}>
      <div className={classes.topBlock}>
        <Information />
        <Description />
        <Links />
      </div>
      <div className={classes.mainBlock}>
        <Switcher mode={mode} setMode={setMode} handleClick={handleSwitcher} />
        <Posts mode={mode} />
      </div>
    </div>
  )
}

export default React.memo(Profile)
