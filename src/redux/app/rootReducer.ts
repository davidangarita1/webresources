import { combineReducers } from 'redux';
import resourcesReducer from '../reducers/resourcesReducer';
import darkModeReducer from '../reducers/darkModeReducer';

const rootReducer = () => {
  return combineReducers({
    resources: resourcesReducer,
    darkMode: darkModeReducer,
  })
}
export default rootReducer
