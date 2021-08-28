import * as ActivityActionTypes from '../actiontypes/ActivityActionTypes';
import * as ActivityConstants from '../constants/ActivityConstants';
import * as AxiosUtil from '../../app/util/AxiosUtil';
import * as MediaUtil from '../../app/util/MediaUtil';

const startActivity = (activity) => {
    return { type: ActivityActionTypes.START_ACTIVITY, payload: activity }
}
const setActivityProgress = (progress) => {
    return { type: ActivityActionTypes.UPDATE_ACTIVITY_PROGRESS, payload: progress }
}
const setActivityError = (error) => {
    return { type: ActivityActionTypes.UPDATE_ACTIVITY_ERROR, payload: error }
}

const getUrl = (mode, activity) => {
    return `activity/${MediaUtil.getMediaPath(mode)}/${ActivityConstants.getPath(activity)}`;
}

export function onStart(mode, activity) {
    return dispatch => {
      dispatch(startActivity(activity));
      return AxiosUtil.patch(getUrl(mode, activity))
        .then(progress => dispatch(setActivityProgress(progress)))
        .catch(e => {
            console.log(e);
            dispatch(setActivityError(e.message))
        });  
    }
}

export function onPollProgress(id) {
    return dispatch => {
      return AxiosUtil.get(`progress/activity/id/${id}`)
      .then(progress => {
        dispatch(setActivityProgress(progress));
      })
      .catch(e => dispatch(setActivityError(e.message)));
    }
}
