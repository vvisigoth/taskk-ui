export const createIssue = (phase, issueObj) => ({
  type: 'CREATE_ISSUE',
  phase,
  issueObj
});

export const postCreateIssue = (phase, issueObj) => ({
  type: 'URB_CREATE_ISSUE',
  phase,
  issueObj
});

export const setBoard = (host, board) => ({
  type: 'SET_BOARD',
  host,
  board
});

export const postDeleteIssue = (phase, issueId) => ({
  type: 'URB_DELETE_ISSUE',
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
  type: 'URB_UPDATE_ISSUE',
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
  type: 'URB_MOVE_ISSUE',
  sourcePhase,
  sourceId,
  targetPhase,
  targetId
})
