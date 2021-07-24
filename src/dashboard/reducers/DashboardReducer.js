import * as DashboardActionTypes from '../actiontypes/DashboardActionTypes';

const initialState = {
  mostRecentInProgress: false,
  mostViewedInProgress: false,
  mostLikedInProgress: false,
  mostRatedInProgress: false,
  mostRecent: [],
  mostViewed: [],
  mostLiked: [],
  mostRated: []
};

export default function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case DashboardActionTypes.SET_MOST_RECENT_IN_PROGRESS:
      return { ...state, mostRecentInProgress: action.payload };
    case DashboardActionTypes.SET_MOST_VIEWED_IN_PROGRESS:
      return { ...state, mostViewedInProgress: action.payload };
    case DashboardActionTypes.SET_MOST_LIKED_IN_PROGRESS:
      return { ...state, mostLikedInProgress: action.payload };
    case DashboardActionTypes.SET_MOST_RATED_IN_PROGRESS:
      return { ...state, mostRatedInProgress: action.payload };

    case DashboardActionTypes.SET_MOST_RECENT:
      return { ...state, mostRecentInProgress: false, mostRecent: action.payload };
    case DashboardActionTypes.SET_MOST_VIEWED:
      return { ...state, mostViewedInProgress: false, mostViewed: action.payload };
    case DashboardActionTypes.SET_MOST_LIKED:
      return { ...state, mostLikedInProgress: false, mostLiked: action.payload };
    case DashboardActionTypes.SET_MOST_RATED:
      return { ...state, mostRatedInProgress: false, mostRated: action.payload };

    default:
      return state;
  }
};
