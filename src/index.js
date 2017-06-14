import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import {Provider} from 'react-redux';
import Store from './store';

const StoreInstance = Store();

const toJson = (r) => {
  let j = r.json();
  return j
};

const populate = (j) => {
  Object.keys(j.board).forEach(k => {
    StoreInstance.dispatch({type: 'CREATE_PHASE', phase: k});
    j.board[k].forEach(j => {
      StoreInstance.dispatch({type: 'CREATE_ISSUE', phase: k, issueObj: j})
    });
  });
  console.debug(StoreInstance.getState());
};

const json = fetch('./dummyBoard.json').then(toJson).then(populate);


ReactDOM.render(
  <Provider store={StoreInstance}> 
    <App />
  </Provider>, 
  document.getElementById('root')
);

registerServiceWorker();
