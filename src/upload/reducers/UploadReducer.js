import * as UploadActionTypes from '../actiontypes/UploadActionTypes';
import * as MediaUtil from '../../app/util/MediaUtil';

const initialState = {
  //fileURL: null,
  type: null,
  name: null,
  size: 0,
  rating: 0,
  quality: 0,
  tags: [ ],
  isUploading: false,
  error: null
};

export default function uploadReducer(state = initialState, action) {
  switch (action.type) {
    case UploadActionTypes.SELECT_FILE:
      const file = action.payload;
      return {
        ...state,
        //fileURL: URL.createObjectURL(file),
        type: MediaUtil.getIdentfiedType(file.type),
        name: file.name.split('.').slice(0, -1).join('.').replace(/([A-Z])/g, ' $1').trim(),
        size: file.size,
        error: null
      };
    case UploadActionTypes.SET_UPLOAD_ERROR: {
      return {
        ...state,
        error: action.payload
      }
    }
    default:
      return state;
  }
};
