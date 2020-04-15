import { combineReducers } from 'redux'
import home from './home'
import settings from './settings'
import news from './news'
import hubs from './hubs'

export default combineReducers({
  news,
  home,
  settings,
  hubs,
})
