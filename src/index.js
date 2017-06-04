import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import {Provider} from 'react-redux';
import Store from './store';

console.debug(Store);

const StoreInstance = Store();

ReactDOM.render(
  <Provider store={StoreInstance}> 
    <App />
  </Provider>, 
  document.getElementById('root')
);

registerServiceWorker();
