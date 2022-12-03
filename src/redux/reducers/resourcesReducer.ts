import actionTypesResources from '../actions/actionTypes/actionTypesResources'

const initialState = {
  isLoading: false,
  resources: [],
  error: false
}

const resourcesReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case actionTypesResources.LOAD_SUCCESS_RESOURCES:
      return {
        ...state,
        isLoading: false,
        resources: payload,
        error: null
      }
    case actionTypesResources.LOAD_FAILURE_RESOURCES:
      return {
        ...state,
        isLoading: false,
        error: payload
      }
    case actionTypesResources.LOADING_RESOURCES
      :
      return {
        ...state,
        isLoading: true,
        error: payload
      }
    default: return state
  }
}

export default resourcesReducer
