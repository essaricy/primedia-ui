import * as SearchActionTypes from '../actiontypes/SearchActionTypes';
import * as AxiosUtil from '../../app/util/AxiosUtil';
import * as MediaUtil from '../../app/util/MediaUtil';

const setSearchMode = (mode) => {
  return { type: SearchActionTypes.SET_SEARCH_MODE, payload: mode };
};

const setSearchText = (value) => {
  return { type: SearchActionTypes.SET_SEARCH_TEXT, payload: value };
};

const setSearchResults = (results) => {
  return { type: SearchActionTypes.SET_SEARCH_RESULTS, payload: results };
};

const setSearchError = (e) => {
  return { type: SearchActionTypes.SET_SEARCH_ERROR, payload: e };
};

export function onSearchMode(mode) {
  console.log("SearchMode: ", mode);
  return dispatch => {
    dispatch(setSearchMode(mode));
  }
}

export function onSearchText(mode, text) {
  return dispatch => {
    dispatch(setSearchText(text));
    AxiosUtil.get(`media/${MediaUtil.getMediaPath(mode)}?s=${text}`)
    .then((results) => {
      dispatch(setSearchResults(results));
    })
    .catch(e => dispatch(setSearchError(e)));
    
  }
}
