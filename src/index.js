import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import { Provider } from 'react-redux';
import Store from './store';

const StoreInstance = Store();



ReactDOM.render(
  <Provider store={StoreInstance}> 
    <App />
  </Provider>, 
  document.getElementById('root')
);

//StoreInstance.dispatch({type: 'SUBSCRIBE'});
StoreInstance.dispatch({type: 'GET_BOARD_DATA'});

registerServiceWorker();
