import request from 'superagent';

const dataService = store => next => action => {
  next(action)
  switch (action.type) {
    case 'SUBSCRIBE':
      window.urb.appl = "taskk";
      window.urb.bind('/~rosfet-ronlyn-mirdel-sillev--satnes-haphul-habryg-loppeg/awholenewboard', (e, r) => {
        console.debug(r);
      });
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
      request
        .get('./dummyBoard.json')
        .end((err, res) => {
          const data = JSON.parse(res.text);
          next({
            type: 'GET_BOARD_DATA_RECEIVED',
            data
          })
        })
    default:
      break
  }

};

export default dataService;
