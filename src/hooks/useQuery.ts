import { useLocation } from 'react-router-dom'

/**
 * Custom hook for getting query from the URL
 */
const useQuery = () => new URLSearchParams(useLocation().search)

export default useQuery
