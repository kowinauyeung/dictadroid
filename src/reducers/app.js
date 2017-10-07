import actionTypes from '../actions/actionTypes';

const initState = {
  isReady: false,
  isLoading: false,
  isFetchingBooks: false,
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

    case actionTypes.IS_FETCHING_BOOKS:
      return {
        ...state,
        isFetchingBooks: action.isFetching,
      };

    case actionTypes.GET_APP_READY:
      return {
        ...state,
        isReady: true,
      };

    default:
      return state;
  }
};

export default app;
