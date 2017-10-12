import actionTypes from '../actions/actionTypes';

const initState = {};

const results = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_RESULTS:
      return action.results;

    default:
      return state;
  }
};

export default results;
