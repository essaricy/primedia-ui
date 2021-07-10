import * as SearchActionTypes from '../actiontypes/SearchActionTypes';

const initialState = {
  mode: 'I',
  text: null,
  inProgress: false,
  results: [],
  error: null
};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case SearchActionTypes.SET_SEARCH_MODE:
      return {
        ...state,
        mode: action.payload
      };
    case SearchActionTypes.SET_SEARCH_TEXT:
      return {
        ...state,
        text: action.payload,
        inProgress: true
      };
    case SearchActionTypes.SET_SEARCH_RESULTS:
      return { 
        ...state,
        inProgress: false,
        results: action.payload
      };
    case SearchActionTypes.SET_SEARCH_ERROR:
      return { 
        ...state,
        inProgress: false,
        error: action.payload
      };
    default:
      return state;
  }
};
