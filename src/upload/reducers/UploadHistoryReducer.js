import * as UploadHistoryActionTypes from '../actiontypes/UploadHistoryActionTypes';

const initialState = {
  history: []
};

export default function uploadHistoryReducer(state = initialState, action) {
  const history = state.history;

  switch (action.type) {
    case UploadHistoryActionTypes.SET_UPLOAD_HISTORY:
      return {
        ...state,
        history: action.payload
      }
    case UploadHistoryActionTypes.SET_RATING:
      history.find(h => h.id === action.payload.id).rating = action.payload.value;
      return {
        ...state,
        history: history
      };
    case UploadHistoryActionTypes.SET_QUALITY:
      history.find(h => h.id === action.payload.id).quality = action.payload.value
      return {
        ...state,
        history: history
      };
    case UploadHistoryActionTypes.SET_TAGS:
      history.find(h => h.id === action.payload.id).tags = action.payload.value;
      return {
        ...state,
        history: history
      };
    default:
      return state;
  }
};
