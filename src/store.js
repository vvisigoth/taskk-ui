import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import dataService from './dataService';

export default(initialState) => {
  return createStore(rootReducer, initialState, applyMiddleware(dataService));
}
