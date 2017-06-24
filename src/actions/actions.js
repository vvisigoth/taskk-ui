export const createIssue = (phase, issueObj) => ({
  type: 'CREATE_ISSUE',
  phase,
  issueObj
});

export const setBoard = (host, board) => ({
  type: 'SET_BOARD',
  host,
  board
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

export const moveIssue = (sourcePhase, sourceId, targetPhase, targetId) => ({
  type: 'MOVE_ISSUE',
  sourcePhase,
  sourceId,
  targetPhase,
  targetId
})
