import tile from './tile';

const createIssue = (state = [], issueObj) => {


  return [tile(undefined, {type: '_UPDATE_ISSUE', issueObj: issueObj}), ...state]
};

const deleteIssue = (state = [], issueId) => {
  //waht about default
  let index = -1;
  state.forEach((t, i) => { if(issueId === t.issueId) { index = i}});
  if (index > -1) {
    return [...state.slice(0, index), ...state.slice(index + 1)];
  } else{
    return [...state]
  }
};

const retrieveIssue = (state =[], issueId) => {
  let index = 0;
  state.forEach((t, i) => { if(issueId === t.issueId) { index = i}});
  return state[index];
};

const insertIssue = (state = [], issueId, issueObj) => {
  let index = 0;
  state.forEach((t, i) => { if(issueId === t.issueId) { index = i}});
  return [...state.slice(0, index), tile(issueObj, {type: 'UPDATE_ISSUE'}), ...state.slice(index)];
};

export default(state = [], action) => {
  switch (action.type) {
    case 'INSERT_ISSUE':
      return insertIssue(state, action.issueId, action.issueObj)
    case '_CREATE_ISSUE':
      return createIssue(state, action.issueObj);
    case '_DELETE_ISSUE':
      return deleteIssue(state, action.issueId);
    case 'RETRIEVE_ISSUE':
      return retrieveIssue(state, action.issueId);
    default:
      return state;
  }
};




