import column from './column';
import tile from './tile';

//this default is probably wrong
const moveIssue = (state = {}, sourcePhase, sourceId, targetPhase, targetId) => {
  let p1 = [...state[sourcePhase]];
  let p2 = [...state[targetPhase]];
  //retrieve issue to be moved
  let tmpIss = column(p1, {type: 'RETRIEVE_ISSUE', issueId: sourceId});
  //delete issue to be moved 
  let tmpBoardFrag = {};
  tmpBoardFrag[sourcePhase] = column(p1, {type: '_DELETE_ISSUE', issueId: sourceId});
  tmpBoardFrag[targetPhase] = column(p2, {type: 'INSERT_ISSUE', issueId: targetId, issueObj: tmpIss});
  return Object.assign({}, state, tmpBoardFrag);
};

const createIssue = (state = {}, phase, issueObj) => {
  let tmpBoardFrag = {};
  if (state[phase]) {
    tmpBoardFrag[phase] = column(state[phase], {type: '_CREATE_ISSUE', issueObj: issueObj})
  } else {
    tmpBoardFrag[phase] = column([], {type: '_CREATE_ISSUE', issueObj: issueObj});
  }
  return Object.assign({}, state, tmpBoardFrag);
};

const deleteIssue = (state = {}, issueId) => {
  let tmpBoardFrag = {};
  Object.keys(state).forEach(k => { tmpBoardFrag[k] = column(state[k], {type: '_DELETE_ISSUE', issueId: issueId})});
  return tmpBoardFrag;
};

const updateIssue = (state = {}, issueId, issueObj) => {
  let tmpBoardFrag = {};
  Object.keys(state).forEach(
      k => {
        tmpBoardFrag[k] =
        state[k].map(j => {
          if (j.issueId === issueId) {
            return tile(j, {type: '_UPDATE_ISSUE', issueObj: issueObj});
          } else {
            return j
          }
        })
      });
  return tmpBoardFrag;
};

export default(state = {}, action) => {

  switch (action.type) {
    case 'TEST_ACTION':
      return state;
    case 'CREATE_ISSUE': 
      return createIssue(state, action.phase, action.issueObj);
    case 'UPDATE_ISSUE':
      return updateIssue(state, action.issueId, action.issueObj);
    case 'DELETE_ISSUE':
      return deleteIssue(state, action.issueId);
    case 'MOVE_ISSUE':
      return moveIssue(state, action.sourcePhase, action.sourceId, action.targetPhase, action.targetId);
    case 'GET_BOARD_RECEIVED':
      return action.data;
    default:

      return state;
  }
};


