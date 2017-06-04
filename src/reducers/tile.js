export default(state = {
  issueId:'',
  title:'',
  description:'',
  author:'',
  assignee: ''
}, action) => {
  switch (action.type) {
    case 'SAVE_ISSUE':
      return {
        ...state, 
        issue: action.issue
      };
    default:
      return state;
  }
};
