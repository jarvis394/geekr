import { combineReducers } from 'redux'
import home from './home'
import settings from './settings'
import news from './news'

export default combineReducers({
  news,
  home,
  settings,
})
