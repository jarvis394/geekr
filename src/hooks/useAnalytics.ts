import { useEffect } from 'react'
import { useMatomo } from '@datapunt/matomo-tracker-react'
import { useLocation } from 'react-router-dom'
import { APP_VERSION } from 'src/config/constants'

const useAnalytics = () => {
  const location = useLocation()
  const { trackPageView } = useMatomo()

  useEffect(() => {
    trackPageView({
      customDimensions: [
        {
          id: 2,
          value: APP_VERSION,
        },
      ],
    })
  }, [location.pathname])
}

export default useAnalytics
