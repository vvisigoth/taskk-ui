import board from './board';
import urb from './urb';
import loading from './loading';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  board,
  urb,
  loading
});


export default rootReducer;


