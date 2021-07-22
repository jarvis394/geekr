import { useTheme, useMediaQuery } from '@material-ui/core'
import { MIN_WIDTH } from 'src/config/constants'

const useMediaExtendedQuery = () => {
  const theme = useTheme()
  const query = useMediaQuery(theme.breakpoints.up(MIN_WIDTH), {
    noSsr: true,
  })
  return query
}

export default useMediaExtendedQuery