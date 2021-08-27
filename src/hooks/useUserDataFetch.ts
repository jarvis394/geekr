import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { FetchingState } from 'src/interfaces'
import { getMe } from 'src/store/actions/auth'
import { useSelector } from '.'

const useUserDataFetch = () => {
  const dispatch = useDispatch()
  const userState = useSelector((state) => state.auth.me.state)
  const authData = useSelector((state) => state.auth.authData.data)
  const csrfToken = useSelector((state) => state.auth.csrfToken.data)
  const shouldFetchUser =
    authData && csrfToken && userState !== FetchingState.Fetched

  useEffect(() => {
    if (shouldFetchUser)
      dispatch(
        getMe({
          ...authData,
          csrfToken,
        })
      )
  }, [csrfToken, authData, shouldFetchUser])
}

export default useUserDataFetch
