import { massageBoard } from './utils';

const listener = (e, r, s) => {
  console.debug(r);
  switch (r.data['action-completed']) {
    case 'request-board':
      s.dispatch({
        type: 'GET_BOARD_RECEIVED',
        data: massageBoard(r.data['response-data'])
      });
      break
    case 'connect':
      s.dispatch({type: 'SUBSCRIBE_APP'});
      break
    case 'create-issue':
      let io = Object.assign(r.data['response-data'], {issueId: r.data['issue-id']});
      s.dispatch({
        type: 'CREATE_ISSUE',
        phase: r.data['response-data'].phase,
        issueObj: io
      });
      break
    default:
      console.debug('unrecognized response');
  }
};

const dataService = store => next => action => {
  next(action);
  switch (action.type) {
    case 'URB_SUBSCRIBE':
      console.debug('subscribing!');
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
    case 'URB_CREATE_ISSUE':
      window.urb.send({
        'action': 'create-issue',
        'host': store.getState().urb.host,
        'phase': action.phase,
        'board': store.getState().urb.board,
        'title': action.issueObj.title,
        'description': action.issueObj.description,
        'author': action.issueObj.author,
        'assignee': action.issueObj.assignee
      }, function(e, r) {
        console.debug('new issue callback');
        console.debug(e);
        console.debug(r);
      });
      break
    case 'URB_DELETE_ISSUE':
      window.urb.send({
        'action': 'delete-issue',
        'host': store.getState().urb.host,
        'phase': action.phase,
        'board': store.getState().urb.board,
        'issue': action.issueId
      }, function(e, r) {
        console.debug('issue deleted callback');
        console.debug(e);
        console.debug(r);
        if (r.status === 200) {
          // Gross and lame
          store.dispatch({type: 'DELETE_ISSUE', issueId: action.issueId});
        }
      });
      break
    case 'URB_UPDATE_ISSUE':
      console.debug(action);
      console.debug(store.getState().urb);
      window.urb.send({
        'action': 'edit-issue',
        'host': store.getState().urb.host,
        'board': store.getState().urb.board,
        'phase': action.issueObj.phase,
        'description': action.issueObj.description,
        'issue': action.issueId
      }, function(e, r) {
        console.debug('update issue callback');
        console.debug(e);
        console.debug(r);
        if (r.status === 200) {
          // Gross and lame
          store.dispatch({type: 'UPDATE_ISSUE', issueId: action.issueId, issueObj: action.issueObj});
        }
      });
      break
    case 'URB_MOVE_ISSUE':
      console.debug(action);
      if (action.sourcePhase == action.targetPhase) {
        break;
      };
      window.urb.send({
        'action': 'change-phase',
        'host': store.getState().urb.host,
        'board': store.getState().urb.board,
        'from-phase': action.sourcePhase,
        'to-phase': action.targetPhase,
        'issue': action.sourceId,
      }, function(e, r) {
        console.debug('callback from phase change');
        if (r.status === 200) {
          store.dispatch(Object.assign(action, {type: 'MOVE_ISSUE'}));
        }
      });
      break
    case 'GET_BOARD':
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
