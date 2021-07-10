import * as HeaderActionTypes from '../actiontypes/HeaderActionTypes';

const initialState = {
};

export default function headerReducer(state = initialState, action) {
  switch (action.type) {
    case HeaderActionTypes.UPDATE_SEARCH_MODE:
      return { ...state, searchMode: action.payload };
    default:
      return state;
  }
};
