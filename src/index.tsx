import * as React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import * as serviceWorker from './serviceWorker'
import moment from 'moment'
import { Provider } from 'mobx-react'
import stores from './store'
import 'react-medium-image-zoom/dist/styles.css'
import 'react-lazy-load-image-component/src/effects/blur.css'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ru = require('moment/locale/ru')
moment.updateLocale('ru', ru)

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root')
)
serviceWorker.register()
