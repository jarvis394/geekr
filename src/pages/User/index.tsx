import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import {
  getProfileCard,
  getProfileChildren,
  getProfileWhois,
} from 'src/store/actions/profile'
import UserPageSkeleton from 'src/components/skeletons/Profile'
import ErrorComponent from 'src/components/blocks/Error'
import Profile from './pages/Profile'
import { useSelector } from 'src/hooks'
import { useDispatch } from 'react-redux'
import OutsidePage from 'src/components/blocks/OutsidePage'

export interface ComponentWithUserParams {
  classes?: string
}

export interface UserParams {
  login: string
}

const User = () => {
  const dispatch = useDispatch()
  const profile = useSelector((state) => state.profile.profile.card.data)
  const whois = useSelector((state) => state.profile.profile.whois.data)
  const isUserFetched = useSelector(
    (state) => state.profile.profile.card.fetched
  )
  const isWhoisFetched = useSelector(
    (state) => state.profile.profile.whois.fetched
  )
  const isUserFetching = useSelector(
    (state) => state.profile.profile.card.fetching
  )
  const isWhoisFetching = useSelector(
    (state) => state.profile.profile.whois.fetching
  )
  const userFetchError = useSelector(
    (state) => state.profile.profile.card.error
  )
  const whoisFetchError = useSelector(
    (state) => state.profile.profile.whois.error
  )
  const { login } = useParams<UserParams>()

  useEffect(() => {
    if (profile?.alias !== login) {
      dispatch(getProfileCard(login))
    }
  }, [login])

  useEffect(() => {
    if (whois?.alias !== login) {
      dispatch(getProfileWhois(login))
    }
  }, [login])

  return (
    <OutsidePage
      headerText={login ? '@' + login : null}
      hidePositionBar
      shrinkedHeaderText={profile?.fullname}
    >
      {(userFetchError || whoisFetchError) && (
        <ErrorComponent message={userFetchError || whoisFetchError} />
      )}
      {isUserFetched && isWhoisFetched && <Profile />}
      {(isUserFetching || isWhoisFetching) && <UserPageSkeleton />}
    </OutsidePage>
  )
}

export default React.memo(User)
