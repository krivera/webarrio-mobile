import {
  SET_NEIGHBORHOODS,
  SET_NEIGHBORHOOD_TREE
} from '../actions/neighborhood'

let initialState = {
  neighborhoods: [],
  neighborhood_list: []
}

export default (state = initialState, action) => {
  switch (action.type) {
  case SET_NEIGHBORHOOD_TREE:
    return {
      neighborhoods: action.data,
      neighborhood_list: state.neighborhood_list
    }
  case SET_NEIGHBORHOODS:
    return {
      neighborhoods: state.neighborhoods,
      neighborhood_list: action.neighborhoods
    }
  default:
    return state
  }
}
