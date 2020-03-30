import * as React from 'react'
import ReactDOM from 'react-dom'
import Layout from './components/Layout'
import * as serviceWorker from './serviceWorker'
import moment from 'moment'
import ru from 'moment/locale/ru'

moment.updateLocale('ru', ru)

ReactDOM.render(<Layout />, document.getElementById('root'))
serviceWorker.unregister()
