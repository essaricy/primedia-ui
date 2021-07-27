import * as UploadActionTypes from '../actiontypes/UploadActionTypes';
import * as UploadConstants from '../constants/UploadConstants';
import * as MediaUtil from '../../app/util/MediaUtil';

const EXCLUDE_ITEMS = [ "and", "like", "near", "with", "then", "before"];
const initialState = {
  fileUrl: null,
  type: null,
  name: null,
  size: 0,
  rating: 0,
  quality: 0,
  tags: [ ],
  progress: {
    id: null,
    status: null,
    startTime: null,
    endTime: null
  },
  retainName: false
};

export default function uploadReducer(state = initialState, action) {
  switch (action.type) {
    case UploadActionTypes.SELECT_FILE:
      const file = action.payload;
      return {
        ...state,
        fileUrl: URL.createObjectURL(file),
        type: MediaUtil.getIdentfiedType(file.type),
        name: state.retainName ? state.name : file.name.split('.').slice(0, -1).join('.').replace(/([A-Z])/g, ' $1').trim(),
        //tags: file.name.match(/\b(\w+)\b/g).filter(el => el.length >=3),
        size: file.size,
        progress: initialState.progress
      };
    case UploadActionTypes.SET_RETAIN_NAME:
      return {
        ...state,
        retainName: action.payload
      };
    case UploadActionTypes.SET_NAME:
      const name = action.payload;
      return {
        ...state,
        name: name,
        tags: name.match(/\b(\w+)\b/g).filter(el => el.length >=3)
      };
    case UploadActionTypes.SET_RATING:
      return {
        ...state,
        rating: action.payload
      };
    case UploadActionTypes.SET_QUALITY:
      return {
        ...state,
        quality: action.payload
      };
    case UploadActionTypes.ADD_TAG:
      const tag = action.payload;
      const tags = state.tags;
      if (!tags.includes(tag) && !EXCLUDE_ITEMS.includes(tag)) {
        tags.push(action.payload);
      }
      return {
        ...state,
        tags: tags
      };
    case UploadActionTypes.DELETE_TAG:
      return {
        ...state,
        tags: state.tags.filter(t => t !== action.payload)
      };
    case UploadActionTypes.SET_UPLOAD_INIT:
      return {
        ...state,
        progress: {
          ...state.progress,
          code: UploadConstants.INIT
        }
      }
    case UploadActionTypes.SET_UPLOAD_INIT_FAIL:
        return {
          ...state,
          progress: {
            ...state.progress,
            code: UploadConstants.INIT_FAIL
          }
        }
    case UploadActionTypes.SET_PROGRESS_STATUS:
      const progress = action.payload;
      return {
        ...state,
        progress: {
          ...progress
        }
      }
    default:
      return state;
  }
};
