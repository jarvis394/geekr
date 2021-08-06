import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { FetchingState } from 'src/interfaces'
import { getDownvoteReasons } from 'src/store/actions/post'
import { useSelector } from '.'

const useGetDownvoteReasons = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state.post.downvoteReasons.state)
  const shouldFetchDownvoteReasons = state !== FetchingState.Fetched

  useEffect(() => {
    if (shouldFetchDownvoteReasons) dispatch(getDownvoteReasons())
  }, [shouldFetchDownvoteReasons])
}

export default useGetDownvoteReasons
