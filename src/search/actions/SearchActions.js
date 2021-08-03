import * as SearchActionTypes from '../actiontypes/SearchActionTypes';
import * as AxiosUtil from '../../app/util/AxiosUtil';
import * as MediaUtil from '../../app/util/MediaUtil';

const setSearchMode = (mode) => {
  return { type: SearchActionTypes.SET_SEARCH_MODE, payload: mode };
};
const setSearchingText = (value) => {
  return { type: SearchActionTypes.SET_SEARCHING_TEXT, payload: value };
};
const setStartSearch = (value) => {
  return { type: SearchActionTypes.SET_START_SEARCH, payload: value };
};
export const setSearchResults = (results) => {
  return { type: SearchActionTypes.SET_SEARCH_RESULTS, payload: results };
};
const setSearchError = (e) => {
  return { type: SearchActionTypes.SET_SEARCH_ERROR, payload: e };
};

export function onSearchMode(mode) {
  return dispatch => dispatch(setSearchMode(mode))
}
export function onSearchValueChange(text) {
  return dispatch => dispatch(setSearchingText(text))
}
export function onSearch(mode, text, history) {
  return dispatch => {
    if (text.length >= 3) {
      dispatch(setStartSearch(text));
      AxiosUtil.get(`media/${MediaUtil.getMediaPath(mode)}?s=${text}`)
      .then((results) => {
        dispatch(setSearchResults(results));
      })
      .catch(e => dispatch(setSearchError(e)));
      }
      history.push('/search');
  }
}
