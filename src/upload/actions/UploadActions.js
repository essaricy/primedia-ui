import * as UploadActionTypes from '../actiontypes/UploadActionTypes';
import * as AxiosUtil from '../../app/util/AxiosUtil';
import * as MediaUtil from '../../app/util/MediaUtil';

const setSelectedFile = (file) => {
  return { type: UploadActionTypes.SELECT_FILE, payload: file };
};
const setName = (value) => {
  return { type: UploadActionTypes.SET_NAME, payload: value };
};
const setRating = (rating) => {
  return { type: UploadActionTypes.SET_RATING, payload: rating };
};
const setQuality = (quality) => {
  return { type: UploadActionTypes.SET_QUALITY, payload: quality };
};
const setTags = (tags) => {
  return { type: UploadActionTypes.SET_TAGS, payload: tags };
};
const setUploadStart = () => {
  return { type: UploadActionTypes.SET_UPLOAD_START };
};
const setUploadEnd = () => {
  return { type: UploadActionTypes.SET_UPLOAD_END };
};
const setUploadError = (error) => {
  return { type: UploadActionTypes.SET_UPLOAD_ERROR, payload: error };
};


export function onFileSelect(file) {
  return dispatch => {
    console.log('onFileSelect', file);
    const type = MediaUtil.getIdentfiedType(file.type);
      if (type == null) {
        dispatch(setUploadError('Select only image or video files'));
      } else {
        dispatch(setSelectedFile(file));
      }
  }
}

export function onSearchText(mode, text) {
  return dispatch => {
    dispatch(setSearchText(text));
    AxiosUtil.get(`media/${MediaUtil.getMediaPath(mode)}?s=${text}`)
    .then((results) => {
      dispatch(setSearchResults(results));
    })
    .catch(e => dispatch(setSearchError(e)));
    
  }
}
