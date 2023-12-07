import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

const middlewares = [thunk]

export type RootState = ReturnType<typeof reducers>
export default createStore(reducers, applyMiddleware(...middlewares))
