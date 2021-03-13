import * as React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import store from './store'
import swConfig from './serviceWorkerConfig'
import dayjs from 'dayjs'
import relativeTimePlugin from 'dayjs/plugin/relativeTime'
import calendarPlugin from 'dayjs/plugin/calendar'
import updateLocalePlugin from 'dayjs/plugin/updateLocale'
import 'dayjs/locale/ru'
import ReactGA from 'react-ga'
import { GA_ID_STRING } from 'src/config/constants'
import 'react-photoswipe/dist/photoswipe.css'

ReactGA.initialize(GA_ID_STRING)

dayjs.locale('ru')
dayjs.extend(relativeTimePlugin)
dayjs.extend(calendarPlugin)
dayjs.extend(updateLocalePlugin)

dayjs.updateLocale('ru', {
  calendar: {
    lastWeek: 'D MMMM, в hh:mm',
    sameDay: 'Сегодня, в hh:mm',
    lastDay: 'Вчера, в hh:mm',
    sameElse: 'DD.MM.YYYY',
  },
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
serviceWorker.register(swConfig)
