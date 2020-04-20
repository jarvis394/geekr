import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import Tabs from 'src/components/blocks/Tabs/UserTabs'
import { getUser } from 'src/store/actions/user'
import UserPageSkeleton from 'src/components/skeletons/Profile'
import ErrorComponent from 'src/components/blocks/Error'
import Profile from './pages/Profile'
import Articles from './pages/Articles'
import Comments from './pages/Comments'
import FavArticles from './pages/FavArticles'
import FavComments from './pages/FavComments'
import { useSelector } from 'src/hooks'
import { useDispatch } from 'react-redux'
import { CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  centered: {
    height: 'calc(100vh - 96px)',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

export interface ComponentWithUserParams {
  classes?: string
}

interface UserParams {
  login: string
}

const routes = {
  profile: Profile,
  comments: Comments,
  articles: Articles,
  favoritesArticles: FavArticles,
  favoritesComments: FavComments,
}

const User = ({ path }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const data = useSelector((state) => state.user.profile.user.data)
  const isUserFetched = useSelector((state) => state.user.profile.user.fetched)
  const isUserFetching = useSelector(
    (state) => state.user.profile.user.fetching
  )
  const userFetchError = useSelector((state) => state.user.profile.user.error)
  const { login } = useParams<UserParams>()
  const Component = routes[path] || Profile
  const user = data ? data.user : null

  useEffect(() => {
    if (user?.login !== login) dispatch(getUser(login))
  }, [login, user, dispatch])

  return (
    <>
      {!userFetchError && <Tabs user={user} />}
      {userFetchError && <ErrorComponent message={userFetchError} />}
      {isUserFetched && (
        <>
          <Component user={user} />
        </>
      )}
      {isUserFetching && (Component === Profile ? (
        <UserPageSkeleton />
      ) : (
        <div className={classes.centered}>
          <CircularProgress />
        </div>
      ))}
    </>
  )
}

export default User
