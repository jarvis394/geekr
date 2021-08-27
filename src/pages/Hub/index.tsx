import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import OutsidePage from 'src/components/blocks/OutsidePage'
import { useSelector } from 'src/hooks'
import { getHub } from 'src/store/actions/hub'
import ErrorComponent from 'src/components/blocks/Error'
import { FetchingState } from 'src/interfaces'
import Profile from './pages/Profile'
import ProfileSkeleton from 'src/components/skeletons/HubProfile'

export interface HubParams {
  alias: string
  page?: string
}

const Hub = () => {
  const dispatch = useDispatch()
  const { alias } = useParams<HubParams>()
  const profile = useSelector((state) => state.hub.profile.data)
  const profileFetchingState = useSelector((state) => state.hub.profile.state)
  const profileFetchError = useSelector((state) => state.hub.profile.fetchError)

  useEffect(() => {
    if (profile?.alias !== alias) dispatch(getHub(alias))
  }, [alias, profile, dispatch])

  return (
    <OutsidePage
      headerText={profile ? profile.titleHtml : null}
      shrinkedHeaderText={
        profileFetchingState === FetchingState.Fetched
          ? profile.titleHtml
          : alias
      }
      hidePositionBar
    >
      {profileFetchingState === FetchingState.Error && (
        <ErrorComponent message={profileFetchError} />
      )}
      {profileFetchingState === FetchingState.Fetched && <Profile />}
      {profileFetchingState === FetchingState.Fetching && <ProfileSkeleton />}
    </OutsidePage>
  )
}

export default React.memo(Hub)
