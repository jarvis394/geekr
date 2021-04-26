import { useEffect } from 'react'
import { useMatomo } from '@datapunt/matomo-tracker-react'
import { useLocation } from 'react-router-dom'

const useAnalytics = () => {
  const location = useLocation()
  const { trackPageView } = useMatomo()

  useEffect(() => {
    trackPageView({
      
    })
  }, [location.pathname])
}

export default useAnalytics
