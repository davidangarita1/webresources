import { combineReducers } from 'redux';
import resourcesReducer from '../reducers/resourcesReducer';
import darkModeReducer from '../reducers/darkModeReducer';
import categoriesReducer from '../reducers/categoriesReducer';

const rootReducer = () => {
  return combineReducers({
    resources: resourcesReducer,
    darkMode: darkModeReducer,
    categories: categoriesReducer,
  })
}
export default rootReducer
