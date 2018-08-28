import { SET_CURRENT, UPDATE_CURRENT_USER } from '../actions/currents'

let initialState = {
  neighborhood: null,
  unit: null,
  apartment: null,
  user: null
}

export default (state = initialState, action) => {
  switch (action.type) {
  case SET_CURRENT:
    let new_state = {
      [action.key]: action.value
    }
    return Object.assign({}, state, new_state)
  case UPDATE_CURRENT_USER:
    return {
      ...state,
      user: {
        ...state.user,
        ...action.data
      }
    }
  default:
    return state
  }
}
