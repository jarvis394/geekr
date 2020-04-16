import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { UserExtended as UserObjectExtended, UserChildren, UserCompanies } from 'src/interfaces/User'
import Tabs from 'src/components/blocks/Tabs/UserTabs'
import { getUser } from 'src/api/user'
import UserPageSkeleton from 'src/components/skeletons/UserPage'
import ErrorComponent from 'src/components/blocks/Error'
import Profile from './pages/Profile'
import Articles from './pages/Articles'
import Comments from './pages/Comments'
import FavArticles from './pages/FavArticles'
import FavComments from './pages/FavComments'

export interface ComponentWithUserParams {
  user: UserObjectExtended
  classes?: string
  childrenData?: UserChildren
  companies?: UserCompanies
}

interface UserParams {
  login: string
}

const routes = {
  'profile': Profile,
  'comments': Comments,
  'articles': Articles,
  'favorites/articles': FavArticles,
  'favorites/comments': FavComments
}

const User = ({ path }) => {
  const [user, setUser] = useState<UserObjectExtended>()
  const [fetchError, setFetchError] = useState<string>()
  const { login } = useParams<UserParams>()
  const Component = routes[path] || Profile

  useEffect(() => {
    const get = async () => {
      try {
        const data = await getUser(login)
        if (!data.success) return setFetchError('Произошла ошибка сервера')
        else setUser(data.data.user)
      } catch (e) {
        setFetchError('Пользователь не найден')
      }
    }
    if (!user || (user && user.login !== login)) get()
  }, [login, user])

  console.log(user)

  if (fetchError) return <ErrorComponent message={fetchError} />

  return user ? (
    <>
      <Tabs user={user} />
      <Component user={user} />
    </>
  ) : (
    <UserPageSkeleton />
  )
}

export default User
