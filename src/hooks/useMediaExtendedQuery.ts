import { useTheme, useMediaQuery } from '@material-ui/core'

const useMediaExtendedQuery = () => {
  const theme = useTheme()
  const query = useMediaQuery(theme.breakpoints.up('md'))
  return query
}

export default useMediaExtendedQuery