import { combineReducers } from 'redux';
import authReducer from './auth';
import currentsReducer from './currents';
import neighborhoodReducer from './neighborhood';

export default combineReducers({
  authReducer,
  currentsReducer,
  neighborhoodReducer
});
