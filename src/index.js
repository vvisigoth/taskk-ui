import React from 'react';
import ReactDOM from 'react-dom';
import { Route, HashRouter } from 'react-router-dom';


import Board from './components/Board';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import { Provider } from 'react-redux';
import Store from './store';

const StoreInstance = Store();

ReactDOM.render(
  <Provider store={StoreInstance}> 
    <HashRouter>
<<<<<<< HEAD
      <Route path="/:host/:board" component={App}/>
=======
      <Route path="/:host/:board" component={Board}/>
>>>>>>> 88ce808498601a38ad4cdf59c1b1da429452c896
    </HashRouter>
  </Provider>, 
  document.getElementById('root')
);

//console.debug(StoreInstance.getState());

StoreInstance.dispatch({type: 'URB_SUBSCRIBE'});

let old = false;

const select = (s) => {
  return s.urb.subscribed
}

const handleChange = () => {

  console.debug(StoreInstance.getState());
  
  let neu = select(StoreInstance.getState());
  if (neu !== old) {
    old = neu;
    StoreInstance.dispatch({type: 'GET_BOARD'});
  } else {
    return 
  }
}

StoreInstance.subscribe(handleChange);

registerServiceWorker();
