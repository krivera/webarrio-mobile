import { NEIGHBORS_LOADED, REQUESTING } from '../actions/neighbors';

const initialState = {
  neighbors: [],
  isRequesting: false
};

export default (state=initialState, action) => {
  switch(action.type){
    case NEIGHBORS_LOADED:
      return {
        neighbors: action.neighbors,
        isRequesting: false
      }
    case REQUESTING:
      return {
        neighbors: state.neighbors,
        isRequesting: true
      }
    default:
      return state;
  }
};
