import axios from 'axios'
import { categoriesLoadSuccess, categoriesLoadError, categoriesLoading } from '../actions/categoriesActions'
import { API_URL } from '../../utils/conecction'
import categories from '../../data/categories.json'

export const getAllCategories = (): any => (dispatch: any) => {
	dispatch(categoriesLoading())
	dispatch(categoriesLoadSuccess(categories))
	const options = {
		method: 'GET',
		url: `${API_URL}/categories/all`,
		headers: { 'Content-Type': 'application/json' }
	}
	/* axios.request(options).then((response) => {
		dispatch(categoriesLoadSuccess(response.data))
	}).catch((error) => {
		dispatch(categoriesLoadError(error.message))
	}) */
}