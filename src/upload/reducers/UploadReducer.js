import * as UploadActionTypes from '../actiontypes/UploadActionTypes';
import * as UploadConstants from '../constants/UploadConstants';
import * as MediaUtil from '../../app/util/MediaUtil';

const initialState = {
  fileUrl: null,
  type: null,
  name: null,
  size: 0,
  rating: 0,
  quality: 0,
  tags: [ ],
  isUploading: false,
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
      const tags = state.tags;
      tags.push(action.payload);
      // TOD: exclude words like and, with, then
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
        isUploading: true,
        progress: {
          ...state.progress,
          code: UploadConstants.INIT
        }
      }
    case UploadActionTypes.SET_UPLOAD_INIT_FAIL:
        return {
          ...state,
          isUploading: false,
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
        },
        isUploading: UploadConstants.isInProgress(progress.status.code)
      }
    default:
      return state;
  }
};
