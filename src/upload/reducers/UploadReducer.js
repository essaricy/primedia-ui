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
  retainName: false,
  isUploading: false,
  uploadMessage: null,
  progress: {
    id: null,
    status: null,
    startTime: null,
    endTime: null
  },
};

function getTagsFromName(name) {
  return name.match(/\b(\w+)\b/g)
    .filter(el => el.length >=3)
    .filter(el => !EXCLUDE_ITEMS.includes(el));
}

export default function uploadReducer(state = initialState, action) {
  switch (action.type) {
    case UploadActionTypes.SELECT_FILE:
      const file = action.payload;
      const name = file.name.split('.').slice(0, -1).join('.').replace(/([A-Z])/g, ' $1').trim();
      return {
        ...state,
        fileUrl: URL.createObjectURL(file),
        type: MediaUtil.getIdentfiedType(file.type),
        name: state.retainName ? state.name : name,
        tags: state.retainName ? state.tags : getTagsFromName(name),
        size: file.size,
        uploadMessage: null,
        progress: initialState.progress
      };
    case UploadActionTypes.SET_MEDIA_NAME:
      const mediaName = action.payload;
      return {
        ...state,
        name: mediaName,
        tags: getTagsFromName(mediaName)
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
    case UploadActionTypes.SET_RETAIN_NAME:
      return {
        ...state,
        retainName: action.payload
      };
    case UploadActionTypes.SET_UPLOAD_ERROR:
      return {
        ...state,
        progress: initialState.progress,
        isUploading: false,
        uploadMessage: action.payload
      }
    case UploadActionTypes.SET_UPLOAD_START:
      return {
        ...state,
        isUploading: true,
        uploadMessage: null,
        progress: {
          ...UploadConstants.getInitProgress()
        }
      }
    case UploadActionTypes.SET_PROGRESS_STATUS:
      const progress = action.payload;
      console.log('UploadActionTypes.SET_PROGRESS_STATUS: ', progress);
      const { status, startTime, endTime } = progress;
      const { code } = status;
      return {
        ...state,
        isUploading: false,
        uploadMessage: UploadConstants.isSuccessful(code)
            ? 'Upload successful in ' + (endTime-startTime) + ' ms'
            : UploadConstants.getLabel(code),
        progress: {
          ...progress
        }
      }
    default:
      return state;
  }
};
