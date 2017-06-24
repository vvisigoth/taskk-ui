import { massageBoard } from './utils';

const listener = (e, r, s) => {
  console.debug(r);
  if (r.data.connected == 'success') {
    s.dispatch({type: 'SUBSCRIBE_APP'});
  }
  if (r.data.length) {
    //console.debug(massageBoard(r.data));
    s.dispatch({
      type: 'GET_BOARD_DATA_RECEIVED',
      data: massageBoard(r.data)
    });
  }
};

const dataService = store => next => action => {
  next(action);
  switch (action.type) {
    case 'POST_SUBSCRIBE':
      let h = store.getState().urb.host;
      let b = store.getState().urb.board;
      // Seems like there could be some async probs here?
      window.urb.init(function() {
        window.urb.appl = "taskk";
        window.urb.bind('/' + h + '/' + b, function(e, r) {
          listener(e, r, store);
        })
      });
      break
    case 'POST_CREATE_ISSUE_DATA':
      // calls to gall
      break
    case 'POST_MOVE_ISSUE_DATA':
      // calls to gall
      break
    case 'POST_UPDATE_ISSUE_DATA':
      // calls to gall
      break
    case 'GET_BOARD_DATA':
      window.urb.send({
        action: 'request-board',
        host: store.getState().urb.host,
        board: store.getState().urb.board
      });
      break
    default:
      break
  }

};

export default dataService;
