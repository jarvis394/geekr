import { NEEDS_UPDATE_KEY } from './config/constants'
import { Config } from './serviceWorker'

const config: Config = {
  onUpdate: (registration: ServiceWorkerRegistration) => {
    console.log(
      '%c[info] %cUnregister current service worker',
      'color: #2979ff;',
      'color: #e9e9e9;'
    )
    registration
      .unregister()
      .then(() => {
        window.postMessage('showUpdateNotification', import.meta.env.BASE_URL)
        localStorage.setItem(NEEDS_UPDATE_KEY, 'true')
        console.log(
          '%c[info] %cSent showUpdateNotification message from SW',
          'color: #2979ff;',
          'color: #e9e9e9;'
        )
      })
      .catch((e) =>
        console.log(
          '%c[error] %cUnable to unregister service worker:',
          'color: #ff5252;',
          'color: #e9e9e9;',
          e
        )
      )
  },
  onSuccess: () => {
    window.postMessage('showUpdateSuccessNotification', window.location.origin)
    console.log(
      '%c[success] %cService worker succeed in registration.',
      'color: #00e676;',
      'color: #e9e9e9;'
    )
  },
}

export default config
