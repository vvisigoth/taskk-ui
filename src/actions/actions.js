export const createIssue = (phase, issueObj) => ({
  type: 'CREATE_ISSUE',
  phase,
  issueObj
});

export const postCreateIssue = (phase, issueObj) => ({
  type: 'POST_CREATE_ISSUE_DATA',
  phase,
  issueObj
});

export const setBoard = (host, board) => ({
  type: 'SET_BOARD',
  host,
  board
});

export const postDeleteIssue = (phase, issueId) => ({
  type: 'POST_DELETE_ISSUE_DATA',
  phase,
  issueId
});

export const deleteIssue = (issueId) => ({
  type: 'DELETE_ISSUE',
  issueId
});

export const updateIssue = (issueId, issueObj) => ({
  type: 'UPDATE_ISSUE',
  issueId,
  issueObj
});

export const postUpdateIssue = (issueId, issueObj) => ({
  type: 'POST_UPDATE_ISSUE_DATA',
  issueId,
  issueObj
});

export const moveIssue = (sourcePhase, sourceId, targetPhase, targetId) => ({
  type: 'MOVE_ISSUE',
  sourcePhase,
  sourceId,
  targetPhase,
  targetId
})

export const postMoveIssue = (sourcePhase, sourceId, targetPhase, targetId) => ({
  type: 'POST_MOVE_ISSUE_DATA',
  sourcePhase,
  sourceId,
  targetPhase,
  targetId
})
