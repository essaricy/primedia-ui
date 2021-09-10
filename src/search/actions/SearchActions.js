import * as SearchActionTypes from '../actiontypes/SearchActionTypes';
import * as AxiosUtil from '../../app/util/AxiosUtil';
import * as MediaUtil from '../../app/util/MediaUtil';

const setSearchingText = (value) => {
  return { type: SearchActionTypes.SET_SEARCHING_TEXT, payload: value };
};
const setStartSearch = (mode, text) => {
  return { type: SearchActionTypes.SET_START_SEARCH, payload: {mode, text} };
};
export const setSearchResults = (mode, results) => {
  return { type: SearchActionTypes.SET_SEARCH_RESULTS, payload: { mode, results } };
};
const setSearchError = (e) => {
  return { type: SearchActionTypes.SET_SEARCH_ERROR, payload: e };
};

export function onSearchValueChange(text) {
  return dispatch => dispatch(setSearchingText(text))
}
export function onSearch(mode, text, history) {
  return dispatch => {
    if (text && text.length >= 3) {
      dispatch(setStartSearch(mode, text));
      AxiosUtil.get(`media/${MediaUtil.getMediaPath(mode)}?s=${text}`)
      .then((results) => {
        dispatch(setSearchResults(mode, results));
      })
      .catch(e => dispatch(setSearchError(e)));
    }
    history.push('/search');
  }
}
