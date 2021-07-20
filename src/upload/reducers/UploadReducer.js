import * as UploadActionTypes from '../actiontypes/UploadActionTypes';
import * as MediaUtil from '../../app/util/MediaUtil';

const IN_PROGRESS_STATES = [ "REQUESTED", "PROC_START", "SAVE_DONE" ];

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
  message: null,
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
        message: null
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
        isUploading: true
      }
    case UploadActionTypes.SET_UPLOAD_INIT_FAIL:
        return {
          ...state,
          isUploading: false,
          message: action.payload
        }
    case UploadActionTypes.SET_PROGRESS_STATUS:
      const progress = action.payload;
      const { status, startTime, endTime } = progress;
      return {
        ...state,
        progress: {
          ...progress
        },
        isUploading: IN_PROGRESS_STATES.includes(status.code),
        message: status.code === "SAVE_DONE" ? `Upload completed in ${endTime-startTime}ms` : status.description
      }
    default:
      return state;
  }
};
