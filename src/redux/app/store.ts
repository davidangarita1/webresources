import { legacy_createStore as createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'

const configureStore = () => {
  const middlewares = [thunk]
  const composeEnhacers = (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose
  const enhancers = composeEnhacers(applyMiddleware(...middlewares))

  const store = createStore(rootReducer(), enhancers)

  return store
}

export default configureStore
