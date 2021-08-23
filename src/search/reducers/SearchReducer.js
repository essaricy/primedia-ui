import * as SearchActionTypes from '../actiontypes/SearchActionTypes';
import * as MediaUtil from '../../app/util/MediaUtil';

const initialState = {
  searchingText: null,
  searchedText: null,
  inProgress: false,
  results: [],
  message: null
};

function getSearchMessage(mode, inProgress, searchingText, results=[]) {
  let message = '';
  if (inProgress == true) {
    message = `Searching for ${searchingText}`;
  } else if (results.length === 0) {
    message = `No ${MediaUtil.getMediaName(mode)} found for ${searchingText}`;
  } else {
    message = `${results.length} ${MediaUtil.getMediaName(mode)} found for ${searchingText}`;
  }
  return message;
}

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case SearchActionTypes.SET_SEARCHING_TEXT:
      return {
        ...state,
        searchingText: action.payload
      };
    case SearchActionTypes.SET_START_SEARCH:
      const { mode:searchMode1, text } = action.payload;
      return {
        ...state,
        inProgress: true,
        searchedText: text,
        message: getSearchMessage(searchMode1, true, state.searchingText),
        results: [],
        error: null
      };
    case SearchActionTypes.SET_SEARCH_RESULTS:
      const { mode:searchMode2, results } = action.payload;
      return { 
        ...state,
        inProgress: false,
        results: results,
        message: getSearchMessage(searchMode2, false, state.searchingText, results)
      };
    case SearchActionTypes.SET_SEARCH_ERROR:
      const error = action.payload;
      const message = error === 'Network Error' ? 'Service is unavailable' : error;
      return { 
        ...state,
        inProgress: false,
        message: message
      };
    default:
      return state;
  }
};
