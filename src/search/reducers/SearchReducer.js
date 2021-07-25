import * as SearchActionTypes from '../actiontypes/SearchActionTypes';
import * as WatchActionTypes from '../../watch/actiontypes/WatchActionTypes';

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
    // case WatchActionTypes.SET_MEDIA:
    //   const searchResults = state.results;
    //   const newMedia = action.payload;
    //   const mediaToUpdate = searchResults[searchResults.findIndex((obj => obj.id == newMedia.id))];
    //   mediaToUpdate.views = newMedia.views;
    //   mediaToUpdate.lastSeen = newMedia.lastSeen;
    //   return {
    //     ...state
    //   };
    default:
      return state;
  }
};
