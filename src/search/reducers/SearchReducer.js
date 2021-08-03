import * as SearchActionTypes from '../actiontypes/SearchActionTypes';
import * as WatchActionTypes from '../../watch/actiontypes/WatchActionTypes';

const initialState = {
  mode: 'I',
  searchingText: null,
  searchedText: null,
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
    case SearchActionTypes.SET_SEARCHING_TEXT:
      return {
        ...state,
        searchingText: action.payload
      };
    case SearchActionTypes.SET_START_SEARCH:
      return {
        ...state,
        searchedText: state.searchingText,
        inProgress: true,
        results: [],
        error: null
      };
    case SearchActionTypes.SET_SEARCH_RESULTS:
      return { 
        ...state,
        inProgress: false,
        results: action.payload
      };
    case SearchActionTypes.SET_SEARCH_ERROR:
      const { message } = action.payload;
      const error = message === 'Network Error' ? 'Service is unavailable' : message;
      return { 
        ...state,
        inProgress: false,
        error: error
      };
    default:
      return state;
  }
};
