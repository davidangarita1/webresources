import actionTypesCategories from './actionTypes/actionTypesCategories'

export const categoriesLoadSuccess = (categories: any) => {
  return {
    type: actionTypesCategories.LOAD_SUCCESS_CATEGORIES,
    payload: categories
  }
}

export const categoriesLoadError = (error: any) => {
  return {
    type: actionTypesCategories.LOAD_FAILURE_CATEGORIES,
    payload: error
  }
}

export const categoriesLoading = () => {
  return {
    type: actionTypesCategories.LOADING_CATEGORIES
  }
}
