import actionTypes from '../actions/actionTypes';

const initState = {};

const books = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_BOOKS:
      return action.books;

    default:
      return state;
  }
};

export default books;
