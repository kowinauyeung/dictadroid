import actionTypes from '../actions/actionTypes';

const initState = {
  isLoading: false,
};

const app = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case actionTypes.HIDE_LOADING:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default app;
