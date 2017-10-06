import actionTypes from '../actions/actionTypes';

const initState = {
  isLogin: true,
  id: 'thisisauserid',
  displayName: 'Kowin Au-Yeung',
  email: 'kowinauyeung@gmail.com',
  photoURL: 'https://lh6.googleusercontent.com/--FhFcgtJAlw/AAAAAAAAAAI/AAAAAAAAAB0/onJMUTrG6uw/photo.jpg',
  activeBookId: 'm3',
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
