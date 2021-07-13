import * as WatchActionTypes from '../actiontypes/WatchActionTypes';

const initialState = {
  id: null,
  name: null,
  type: null,
  quality: 0,
  size: 0,
  rating: 0,
  tags: [],
  views: 0,
  likes: 0,
  uploadDate: null,
  lastSeen: null,
  isEditingName: false
};

export default function watchReducer(state = initialState, action) {
  switch (action.type) {
    case WatchActionTypes.SET_MEDIA:
      return { ...action.payload };
    case WatchActionTypes.SET_EDITING_NAME_START:
      return { ...state, isEditingName: true };
    case WatchActionTypes.SET_NAME:
      return { ...state, isEditingName: true, name: action.payload };
    case WatchActionTypes.SET_EDITING_NAME_END:
      return { ...state, isEditingName: false, name: action.payload };
    case WatchActionTypes.SET_QUALITY:
      return { ...state, quality: action.payload };
    case WatchActionTypes.SET_RATING:
      return { ...state, rating: action.payload };
    case WatchActionTypes.SET_TAGS:
      return { ...state, tags: action.payload };
    case WatchActionTypes.ADD_LIKE:
      return { ...state, likes: state.likes + 1 };
    default:
      return state;
  }
};
