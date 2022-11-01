import axios from 'axios'
import { resourcesLoadSuccess, resourcesLoadError, resourcesLoading } from '../actions/resourcesActions'
import { API_URL, API_LOCAL } from '../../utils/conecction'

export const getAllResources = (): any => (dispatch: any) => {
  dispatch(resourcesLoading())

  const options = {
    method: 'GET',
    url: `${API_URL}/resources/`,
    headers: { 'Content-Type': 'application/json' }
  }

  axios.request(options).then(function (response) {
    dispatch(resourcesLoadSuccess(response.data))
  }).catch(function (error) {
    dispatch(resourcesLoadError(error.message))
  })
}

export const createResource = (data: any): any => async (dispatch: any) => {
  dispatch(resourcesLoading())

  const options = {
    method: 'POST',
    url: `${API_LOCAL}/resources/create`,
    headers: { 'Content-Type': 'application/json' },
    data: data
  }

  axios.request(options).then(function (response) {
    dispatch(resourcesLoadSuccess(response.data))
  }).catch(function (error) {
    dispatch(resourcesLoadError(error.message))
  })
}