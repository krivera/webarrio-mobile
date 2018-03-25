import { AUTH_TOKEN_UPDATED } from '../actions/auth';
import { REHYDRATE } from 'redux-persist/es/constants';

let initialState = {authToken: null};

const authReducer = (state=initialState, action) => {
  switch(action.type){
    case AUTH_TOKEN_UPDATED:
      return {
        ...state,
        authToken: action.authToken,
      };
    default:
      return state
  }
}

export default authReducer;
