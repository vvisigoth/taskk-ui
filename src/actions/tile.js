
export const saveIssue = (issue={
  issueId: '',
  title: '',
  description: '',
  author: '',
  assignee: ''
}) => {
  console.debug('saving issue:', issue);
  return {
    type: SAVE_ISSUE
    issue
  };
}

export const deleteIssue = (issueId='') => ({
  type: DELETE_ISSUE,
  issueId
});
