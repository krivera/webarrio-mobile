import { SET_NEIGHBORHOO_TREE } from '../actions/neighborhood';

let initialState = {
  neighborhoods: []
}

export default (state=initialState, action) => {
  switch(action.type){
    case SET_NEIGHBORHOO_TREE:
      return {
        ...state,
        neighborhoods: action.data
      }
    default:
      return state;
  }
}
