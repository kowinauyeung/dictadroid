import actionTypes from '../actions/actionTypes';

const initState = {
  isLogin: false,
  id: null,
  displayName: null,
  email: null,
  photoURL: null,
  activeBookId: null,
};

const user = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_ACTIVE_BOOK:
      return {
        ...state,
        activeBookId: action.activeBookId,
      };
    default:
      return state;
  }
};

export default user;
