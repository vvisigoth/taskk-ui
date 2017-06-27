export const moveTile = (sourcePhase, sourceId, targetPhase, targetId) => {
  return {
    type: 'MOVE_ISSUE',
    sourcePhase,
    sourceId,
    targetPhase,
    targetId
  }
};
