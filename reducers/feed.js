import { SET_FILTER } from '../actions/feed'

const initialState = {
  filter: 'all'
}

export default (state = initialState, action) => {
  switch (action.type) {
  case SET_FILTER:
    return {
      ...state,
      filter: action.filter
    }
  default:
    return state
  }
}
