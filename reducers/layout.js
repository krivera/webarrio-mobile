import SET_TABBAR_HEIGHT from '../actions/layout'

const initialState = {
  tabBarHeight: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
  case SET_TABBAR_HEIGHT:
    return {
      ...state,
      tabBarHeight: action.height
    }
  default:
    return state
  }
}
