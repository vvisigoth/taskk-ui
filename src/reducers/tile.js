// change this to issue
const saveIssue = (state, issueObj) => {
  if (typeof(issueObj) === 'undefined') {
    return state;
  } else {
    return Object.assign({}, state, issueObj);
  }
};

export default(state = {
  issueId:'',
  title:'',
  description:'',
  author:'',
  assignee: ''
}, action) => {

  switch (action.type) {
    case '_UPDATE_ISSUE':
      return saveIssue(state, action.issueObj);
    default:
      return state;
  }
};
