import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import promise from 'redux-promise-middleware'
import thunk from 'redux-thunk'
import reducers from './reducers'

const middleware = applyMiddleware(
  promise,
  thunk,
  createLogger({ collapsed: true })
)

export type RootState = ReturnType<typeof reducers>
export default createStore(reducers, middleware)
