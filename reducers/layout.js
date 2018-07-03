import SET_TABBAR_HEIGHT from '../actions/layout'

const initialState = {
  height: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
  case SET_TABBAR_HEIGHT:
    return {
      ...state,
      height: action.type
    }
  default:
    return state
  }
}
