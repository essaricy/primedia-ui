import * as HeaderActionTypes from '../actiontypes/HeaderActionTypes';

const setSearchMode = (mode) => {
  return { type: HeaderActionTypes.UPDATE_SEARCH_MODE, payload: mode };
};

const setSearchValue = (value) => {
  return { type: HeaderActionTypes.UPDATE_SEARCH_VALUE, payload: value };
};


export function onSearchMode(mode) {
  alert("SearchMode: " + mode);
  return dispatch => {
    dispatch(setSearchMode(mode));
  }
}

export function onSearch(value) {
  alert("SearchValue: " + value);
  return dispatch => {
    dispatch(setSearchValue(value));
  }
}