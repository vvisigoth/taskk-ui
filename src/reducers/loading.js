export default (state=false, action) => {
  switch (action.type) {
    case 'POST_UPDATE_ISSUE_DATA':
      return true;
    case 'POST_CREATE_ISSUE_DATA':
      return true;
    case 'POST_MOVE_ISSUE_DATA':
      return true;
    case 'POST_DELETE_ISSUE_DATA':
      return true;
    case 'GET_BOARD_DATA':
      return true;
    case 'UPDATE_ISSUE':
      return false;
    case 'CREATE_ISSUE':
      return false;
    case 'DELETE_ISSUE':
      return false;
    case 'MOVE_ISSUE':
      return false;
    case 'GET_BOARD_DATA_RECEIVED':
      return false;
    default:
      return state;
  }
};
