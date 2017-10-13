import actionTypes from '../actions/actionTypes';

const initState = {
  isLogin: false,
  id: null,
  displayName: null,
  email: null,
  photoURL: null,
  activeBookId: null,
  lang: 'en',
};

const user = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_ACTIVE_BOOK:
      return {
        ...state,
        activeBookId: action.activeBookId,
      };

    case actionTypes.SET_USER_LANG:
      return {
        ...state,
        lang: action.lang,
      };

    case actionTypes.LOGIN:
      return {
        isLogin: true,
        ...action.user,
      };

    case actionTypes.LOGOUT:
      return initState;

    default:
      return state;
  }
};

export default user;
