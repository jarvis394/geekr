import * as React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import store from './store'
import swConfig from './serviceWorkerConfig'
import 'react-medium-image-zoom/dist/styles.css'
import 'react-lazy-load-image-component/src/effects/blur.css'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import relativeTimePlugin from 'dayjs/plugin/relativeTime'
import calendarPlugin from 'dayjs/plugin/calendar'
import updateLocalePlugin from 'dayjs/plugin/updateLocale'

dayjs.locale('ru')
dayjs.extend(relativeTimePlugin)
dayjs.extend(calendarPlugin)
dayjs.extend(updateLocalePlugin)

dayjs.updateLocale('ru', {
  calendar: {
    sameDay: 'Сегодня, в hh:mm',
    lastDay: 'Вчера, в hh:mm',
    sameElse: 'DD.MM.YYYY'
  },
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
serviceWorker.register(swConfig)
