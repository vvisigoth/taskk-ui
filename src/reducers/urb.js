const setBoard = (state, host, board) => {
  return Object.assign(state, { host, board });
};

export default(state = {subscribed:false}, action) => {
  switch (action.type) {
    case 'SUBSCRIBE_APP':
      console.debug('subscribing app');
      let n = Object.assign(state, {subscribed: true});
      console.debug(n);
      return n;
    case 'SET_BOARD':
      return setBoard(state, action.host, action.board);
    default:
      return state;
  }
};


