import { SET_CURRENT } from '../actions/currents';

let initialState = {
  neighborhood: null,
  unit: null,
  apartment: null,
  user: null
}

export default (state=initialState, action) => {
  switch (action.type){
    case SET_CURRENT:
      let new_state = {};
      new_state[action.key] = action.value;
      return {
        ...state,
        ...new_state
      }
    default:
      return state
  }
}