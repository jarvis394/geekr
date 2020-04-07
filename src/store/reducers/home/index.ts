import { combineReducers } from 'redux'
import all from './all'
import week from './week'
import day from './day'
import month from './month'

export default combineReducers({
  all,
  month,
  day,
  week,
})
