import * as SearchActionTypes from '../actiontypes/SearchActionTypes';
import * as MediaUtil from '../../app/util/MediaUtil';

const initialState = {
  searchingText: null,
  searchedText: null,
  inProgress: false,
  results: [],
  error: null
};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case SearchActionTypes.SET_SEARCHING_TEXT:
      return {
        ...state,
        searchingText: action.payload
      };
    case SearchActionTypes.SET_START_SEARCH:
      const { text } = action.payload;
      return {
        ...state,
        inProgress: true,
        searchedText: text,
        results: [],
        error: null
      };
    case SearchActionTypes.SET_SEARCH_RESULTS:
      const { results } = action.payload;
      return { 
        ...state,
        inProgress: false,
        results: results,
      };
    case SearchActionTypes.SET_SEARCH_ERROR:
      const error = action.payload;
      return { 
        ...state,
        inProgress: false,
        error: error.message
      };
    default:
      return state;
  }
};
