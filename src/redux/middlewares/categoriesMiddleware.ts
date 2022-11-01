import axios from 'axios'
import { categoriesLoadSuccess, categoriesLoadError, categoriesLoading } from '../actions/categoriesActions'
import { API_URL } from '../../utils/conecction'

export const getAllCategories = (): any => (dispatch: any) => {
	dispatch(categoriesLoading())

	const options = {
		method: 'GET',
		url: `${API_URL}/categories/`,
		headers: { 'Content-Type': 'application/json' }
	}

	axios.request(options).then(function (response) {
		dispatch(categoriesLoadSuccess(response.data))
	}).catch(function (error) {
		dispatch(categoriesLoadError(error.message))
	})
}