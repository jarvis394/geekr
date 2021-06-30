import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { FetchingState } from 'src/interfaces'
import { getMe } from 'src/store/actions/user'
import { useSelector } from '.'

const useUserDataFetch = () => {
  const dispatch = useDispatch()
  const userState = useSelector((state) => state.user.profile.state)
  const token = useSelector((state) => state.user.token)
  const shouldFetchUser = !!token
  const shouldShowUser = userState === FetchingState.Fetched

  useEffect(() => {
    if (shouldFetchUser && !shouldShowUser) dispatch(getMe(token))
  }, [
    token,
    shouldFetchUser,
    shouldShowUser,
  ])
}

export default useUserDataFetch
