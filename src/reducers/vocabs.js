import actionTypes from '../actions/actionTypes';

const initState = {};

const vocabs = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_VOCABS:
      return action.vocabs;

    default:
      return state;
  }
};

export default vocabs;
