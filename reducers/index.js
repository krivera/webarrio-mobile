import { combineReducers } from 'redux'
import authReducer from './auth'
import currentsReducer from './currents'
import neighborhoodReducer from './neighborhood'
import neighborsReducer from './neighbors'
import chatReducer from './chat'
import feedReducer from './feed'
import layoutReducer from './layout'

export default combineReducers({
  authReducer,
  currentsReducer,
  neighborhoodReducer,
  chatReducer,
  neighborsReducer,
  feedReducer,
  layoutReducer
})
