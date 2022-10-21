import actionTypesDarkMode from '../actions/actionTypes/actionTypesDarkMode'

const initialState = {
  isActive: false
}

const darkModeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypesDarkMode.TOGGLE:
      return {
        isActive: !state.isActive
      }
    default: return state
  }
}

export default darkModeReducer
