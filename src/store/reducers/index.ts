import { combineReducers } from 'redux'
import home from './home'
import settings from './settings'
import news from './news'
import hubs from './hubs'
import profile from './profile'
import auth from './auth'
import post from './post'
import hub from './hub'

export default combineReducers({
  news,
  home,
  settings,
  hubs,
  auth,
  profile,
  post,
  hub,
})
