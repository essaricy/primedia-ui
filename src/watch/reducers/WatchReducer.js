import * as WatchActionTypes from '../actiontypes/WatchActionTypes';

const initialState = {
  media: {
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
  },
  collection: []
};

export default function watchReducer(state = initialState, action) {
  switch (action.type) {
    case WatchActionTypes.SET_WATCH_COLLECTION:
      return {
        ...state,
        collection: action.payload
      };
    case WatchActionTypes.SET_WATCH_MEDIA:
      const media = action.payload;
      return {
        ...state,
        media: {
          ...media,
          views: media.views + 1,
          lastSeen: new Date().getTime()
        },
      };
    case WatchActionTypes.SET_START_EDITING_NAME:
      return {
        ...state,
        media: {
          ...state.media,
          isEditingName: true
        }
      };
    case WatchActionTypes.SET_MEDIA_NAME:
      return {
        ...state,
        media: {
          ...state.media,
          isEditingName: true,
          name: action.payload
        }
      };
    case WatchActionTypes.SET_END_EDITING_NAME:
      return {
        ...state,
        media: {
          ...state.media,
          isEditingName: false,
          name: action.payload
        }
      };
    case WatchActionTypes.SET_QUALITY:
      return {
        ...state,
        media: {
          ...state.media,
          quality: action.payload
        }
      };
    case WatchActionTypes.SET_RATING:
      return {
        ...state,
        media: {
         ...state.media,
         rating: action.payload
        }
      };
    case WatchActionTypes.SET_TAGS:
      return {
        ...state,
        media: {
          ...state.media,
          tags: action.payload
        }
      };
    case WatchActionTypes.ADD_LIKE:
      return {
        ...state,
        media: {
          ...state.media,
          likes: state.likes + 1
        }
      };
    default:
      return state;
  }
};
