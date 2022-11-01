import actionTypesCategories from '../actions/actionTypes/actionTypesCategories'

const initialState = {
  isLoading: false,
  categories: [],
  error: false
}

const categoriesReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case actionTypesCategories.LOAD_SUCCESS_CATEGORIES:
      return {
        ...state,
        isLoading: false,
        categories: payload,
        error: null
      }
    case actionTypesCategories.LOAD_FAILURE_CATEGORIES:
      return {
        ...state,
        isLoading: false,
        error: payload
      }
    case actionTypesCategories.LOADING_CATEGORIES
      :
      return {
        ...state,
        isLoading: true,
        error: payload
      }
    default: return state
  }
}

export default categoriesReducer
