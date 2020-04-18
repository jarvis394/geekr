import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import Tabs from 'src/components/blocks/Tabs/UserTabs'
import { getUser } from 'src/store/actions/user'
import UserPageSkeleton from 'src/components/skeletons/UserPage'
import ErrorComponent from 'src/components/blocks/Error'
import Profile from './pages/Profile'
import Articles from './pages/Articles'
import Comments from './pages/Comments'
import FavArticles from './pages/FavArticles'
import FavComments from './pages/FavComments'
import { useSelector } from 'src/hooks'
import { useDispatch } from 'react-redux'

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
  'favorites/articles': FavArticles,
  'favorites/comments': FavComments,
}

const User = ({ path }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user.profile.user.data)
  const isUserFetched = useSelector((state) => state.user.profile.user.fetched)
  const isUserFetching = useSelector(
    (state) => state.user.profile.user.fetching
  )
  const userFetchError = useSelector((state) => state.user.profile.user.error)
  const { login } = useParams<UserParams>()
  const Component = routes[path] || Profile

  useEffect(() => {
    if (user?.login !== login) dispatch(getUser(login))
  }, [login, user, dispatch])

  return (
    <>
      {userFetchError && <ErrorComponent message={userFetchError} />}
      {isUserFetched && (
        <>
          <Tabs user={user} />
          <Component user={user} />
        </>
      )}
      {isUserFetching && <UserPageSkeleton />}
    </>
  )
}

export default User
