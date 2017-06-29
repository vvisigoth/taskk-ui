import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import urbWare from './urbWare';

export default(initialState) => {
  return createStore(rootReducer, initialState, applyMiddleware(urbWare));
}
