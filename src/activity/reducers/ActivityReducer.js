import * as ActivityActionTypes from '../actiontypes/ActivityActionTypes';
import * as ActivityConstants from '../constants/ActivityConstants';

const initialState = {
  activity: null,
  name: null,
  inProgress: false,
  progressId: null,
  total: 0,
  success: 0,
  skipped: 0,
  failed: 0,
  remaining: 100,
  message: null,
};

function getCompletedMessage(activity, startTime, endTime) {
  let mydate=new Date(endTime-startTime);
  const minutes = mydate.getUTCMinutes();
  const seconds = mydate.getUTCSeconds();
  return `Activity "${getName(activity)}" completed in ${minutes > 0 ? " minutes, " : ""} ${seconds} seconds`;
}
function getName(activity) {
  return ActivityConstants.getName(activity)
}

export default function activitiesReducer(state = initialState, action) {
  switch (action.type) {
    case ActivityActionTypes.START_ACTIVITY:
      return {
        ...initialState,
        activity: action.payload,
        name: getName(action.payload),
        inProgress: true,
        remaining: 100,
        message: null
      }
    case ActivityActionTypes.UPDATE_ACTIVITY_PROGRESS:
      const { id, activity, total, success, skipped, failed, startTime, endTime } = action.payload;
      const inProgress = total != (success + skipped + failed);
      return {
        ...state,
        progressId: id,
        total, success, skipped, failed,
        remaining: total - success - skipped - failed,
        inProgress: inProgress,
        message: inProgress ? null : getCompletedMessage(activity, startTime, endTime),
      }
    case ActivityActionTypes.UPDATE_ACTIVITY_ERROR:
      return {
        ...state,
        inProgress: false,
        message: `Could not complete activity "${getName(state.activity)}". Error was ${action.payload}.`
      }
    default:
      return state;
  }
}