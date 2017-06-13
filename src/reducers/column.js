import tile from './tile';

const createIssue = (state = []) => {
  return [...state, tile(undefined, {type: 'UPDATE_ISSUE'})]
};

const deleteIssue = (state = [], issueId) => {
  //write this
  let index = 0;
  state.forEach((t, i) => { if(issueId == t.issueId) { index = i}});
  return [...state.slice(0, index), ...state.slice(index + 1)];

};

const insertIssue = (state = [], issueId, issueObj) => {
  let index = 0;
  state.forEach((t, i) => { if(issueId == t.issueId) { index = i}});
  return [...state.slice(0, index), tile(issueObj, {type: 'UPDATE_ISSUE'}), ...state.slice(index)];
};

export default(state = [], action) => {
  switch (action.type) {
    case 'INSERT_ISSUE':
      return insertIssue(state, action.issueId, action.issueObj)
    case 'CREATE_ISSUE':
      return createIssue(state);
    case 'DELETE_ISSUE':
      return deleteIssue(state, action.issueId);
    default:
      return state;
  };
};


