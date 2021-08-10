import * as DashboardActionTypes from '../actiontypes/DashboardActionTypes';
import * as AxiosUtil from '../../app/util/AxiosUtil';
import * as MediaUtil from '../../app/util/MediaUtil';

const setInProgress = (type, val) => {
  return { type: type, payload: val };
};
const setResults = (type, results) => {
  return { type: type, payload: results };
};

export function loadMost(dispatch, mode, resultActionType, progressActionType, urlPart) {
   dispatch(setInProgress(progressActionType, true));
   return AxiosUtil.get(`media/${MediaUtil.getMediaPath(mode)}/${urlPart}?max=5`)
   .then(results => dispatch(setResults(resultActionType, results)));
}
export function onLoad(mode) {
    return dispatch => {
        loadMost(dispatch, mode, DashboardActionTypes.SET_MOST_RECENT,
          DashboardActionTypes.SET_MOST_RECENT_IN_PROGRESS, 'recent')
        loadMost(dispatch, mode, DashboardActionTypes.SET_MOST_VIEWED,
          DashboardActionTypes.SET_MOST_VIEWED_IN_PROGRESS, 'viewed')
        loadMost(dispatch, mode, DashboardActionTypes.SET_MOST_LIKED,
          DashboardActionTypes.SET_MOST_LIKED_IN_PROGRESS, 'liked')
        loadMost(dispatch, mode, DashboardActionTypes.SET_MOST_RATED,
          DashboardActionTypes.SET_MOST_RATED_IN_PROGRESS, 'rated')
    }
}
