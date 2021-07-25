import * as DashboardActionTypes from '../actiontypes/DashboardActionTypes';
import * as AxiosUtil from '../../app/util/AxiosUtil';
import * as MediaUtil from '../../app/util/MediaUtil';
import * as SearchActions from '../../search/actions/SearchActions';
import * as WatchActions from '../../watch/actions/WatchActions';

const setInProgress = (type, val) => {
  return { type: type, payload: val };
};
const setResults = (type, results) => {
  return { type: type, payload: results };
};

export function loadMost(dispatch, resultActionType, progressActionType, url) {
   dispatch(setInProgress(progressActionType, true));
   return AxiosUtil.get(`media/${url}`)
   .then(results => dispatch(setResults(resultActionType, results)));
}
export function onLoad() {
    return dispatch => {
        loadMost(dispatch, DashboardActionTypes.SET_MOST_RECENT, DashboardActionTypes.SET_MOST_RECENT_IN_PROGRESS, 'recent/most')
        loadMost(dispatch, DashboardActionTypes.SET_MOST_VIEWED, DashboardActionTypes.SET_MOST_VIEWED_IN_PROGRESS, 'viewed/most')
        loadMost(dispatch, DashboardActionTypes.SET_MOST_LIKED, DashboardActionTypes.SET_MOST_LIKED_IN_PROGRESS, 'liked/most')
        loadMost(dispatch, DashboardActionTypes.SET_MOST_RATED, DashboardActionTypes.SET_MOST_RATED_IN_PROGRESS, 'rated/most')
    }
}
export function onMediaClick(media, results) {
  return dispatch => {
    dispatch(WatchActions.setWatchMedia(media));
    dispatch(SearchActions.setSearchResults(results));
  }
}