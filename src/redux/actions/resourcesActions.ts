import actionTypesResources from './actionTypes/actionTypesResources'

export const resourcesLoadSuccess = (resources: any) => {
  return {
    type: actionTypesResources.LOAD_SUCCESS_RESOURCES,
    payload: resources
  }
}

export const resourcesLoadError = (error: any) => {
  return {
    type: actionTypesResources.LOAD_FAILURE_RESOURCES,
    payload: error
  }
}

export const resourcesLoading = () => {
  return {
    type: actionTypesResources.LOADING_RESOURCES
  }
}
