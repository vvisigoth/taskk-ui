export default (state=false, action) => {
  switch (action.type) {
    case 'URB_UPDATE_ISSUE':
      return true;
    case 'URB_CREATE_ISSUE':
      return true;
    case 'URB_MOVE_ISSUE':
      return true;
    case 'URB_DELETE_ISSUE':
      return true;
    case 'GET_BOARD':
      return true;
    case 'UPDATE_ISSUE':
      return false;
    case 'CREATE_ISSUE':
      return false;
    case 'DELETE_ISSUE':
      return false;
    case 'MOVE_ISSUE':
      return false;
    case 'GET_BOARD_RECEIVED':
      return false;
    default:
      return state;
  }
};
