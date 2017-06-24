import board from './board';
import urb from './urb';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  board,
  urb
});


export default rootReducer;


