import { combineReducers } from 'redux'
import home from './home'
import settings from './settings'
import news from './news'
import hubs from './hubs'
import profile from './profile'
import user from './user'

export default combineReducers({
  news,
  home,
  settings,
  hubs,
  user,
  profile,
})
