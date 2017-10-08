import actionTypes from '../actions/actionTypes';

const initState = {};

const lessons = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_LESSONS:
      return action.lessons;

    default:
      return state;
  }
};

export default lessons;
