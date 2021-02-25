import { useEffect } from 'react'
import ReactGA from 'react-ga'
import { useLocation } from 'react-router-dom'
import { getCLS, getFID, getLCP } from 'web-vitals'

const useAnalytics = () => {
  const location = useLocation()
  const reportVitalsToGA = ({ name, delta, id }) => {
    ReactGA.event({
      category: 'Web Vitals',
      action: name,
      label: id,
      value: Math.round(name === 'CLS' ? delta * 1000 : delta),
      nonInteraction: true,
    })
  }
  useEffect(() => {
    ReactGA.set({ page: location.pathname })
    ReactGA.pageview(location.pathname)
    getCLS(reportVitalsToGA)
    getFID(reportVitalsToGA)
    getLCP(reportVitalsToGA)
  }, [location])
}

export default useAnalytics
