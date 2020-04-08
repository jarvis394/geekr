import * as React from 'react'
import ReactDOM from 'react-dom'
import Layout from './components/Layout'
import * as serviceWorker from './serviceWorker'
import moment from 'moment'
import ru from 'moment/locale/ru'
import { Provider } from 'react-redux'
import store from './store'

moment.updateLocale('ru', ru)

ReactDOM.render(
  <Provider store={store}>
    <Layout />
  </Provider>,
  document.getElementById('root')
)
serviceWorker.register()
