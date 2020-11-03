import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducers from './reducers'

const middleware = applyMiddleware(thunk, createLogger({ collapsed: true }))

export type RootState = ReturnType<typeof reducers>
export default createStore(reducers, middleware)
