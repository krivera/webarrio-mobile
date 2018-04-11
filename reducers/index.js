import { combineReducers } from 'redux';
import authReducer from './auth';
import currentsReducer from './currents';
import neighborhoodReducer from './neighborhood';
import neighborsReducer from './neighbors';
import chatReducer from './chat';

export default combineReducers({
  authReducer,
  currentsReducer,
  neighborhoodReducer,
  chatReducer,
  neighborsReducer,
});
