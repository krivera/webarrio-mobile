import { AUTH_TOKEN_UPDATED, DESTROY_TOKEN } from '../actions/auth';
import { REHYDRATE } from 'redux-persist/es/constants';

const initialState = {authToken: null};

const authReducer = (state=initialState, action) => {
  switch(action.type){
    case AUTH_TOKEN_UPDATED:
      return Object.assign(
        {},
        state,
        { authToken: action.authToken }
      );
    case DESTROY_TOKEN:
      return {
        authToken: ''
      };
    default:
      return state
  }
}

export default authReducer;
