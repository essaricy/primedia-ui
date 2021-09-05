import * as UploadActionTypes from '../actiontypes/UploadActionTypes';
import * as UploadConstants from '../constants/UploadConstants';
import * as MediaUtil from '../../app/util/MediaUtil';

const EXCLUDE_ITEMS = [ "and", "like", "near", "with", "then", "before", "the" ];
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
  }
};

function getTagsFromName(name) {
  return name.match(/\b(\w+)\b/g)
    .filter(el => el.length >=3)
    .filter(el => !EXCLUDE_ITEMS.includes(el));
}
function getUploadedMessage(startTime, endTime) {
  let mydate=new Date(endTime-startTime);
  const minutes = mydate.getUTCMinutes();
  const seconds = mydate.getUTCSeconds();
  return 'Upload completed in ' + (minutes > 0 ? " minutes, " : "") + (seconds + " seconds");
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
          ...state.progress,
          status: UploadConstants.getFirstStep()
        }
      }
    case UploadActionTypes.SET_PROGRESS_STATUS:
      const progress = action.payload;
      const { status, startTime, endTime } = progress;
      return {
        ...state,
        isUploading: false,
        uploadMessage: UploadConstants.isCompleted(status)
            ? getUploadedMessage(startTime, endTime)
            : null,
        progress: {
          ...progress
        }
      }
    default:
      return state;
  }
};
