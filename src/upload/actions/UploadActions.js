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
const addTag = (tag) => {
  return { type: UploadActionTypes.ADD_TAG, payload: tag };
};
const deleteTag = (tag) => {
  return { type: UploadActionTypes.DELETE_TAG, payload: tag };
};
const setUploadInit = () => {
  return { type: UploadActionTypes.SET_UPLOAD_INIT };
};
const setUploadInitFail = (error) => {
  return { type: UploadActionTypes.SET_UPLOAD_INIT_FAIL, payload: error };
};
const setProgressStatus = (progress) => {
  return { type: UploadActionTypes.SET_PROGRESS_STATUS, payload: progress };
};
const setRetainName = (val) => {
  return { type: UploadActionTypes.SET_RETAIN_NAME, payload: val };
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
export function onNameChange(val) {
  return dispatch => dispatch(setName(val));
}
export function onRatingChange(val) {
  return dispatch => dispatch(setRating(val));
}
export function onQualityChange(val) {
  return dispatch => dispatch(setQuality(val));
}
export function onTagAdd(val) {
  return dispatch => dispatch(addTag(val));
}
export function onTagDelete(val) {
  return dispatch => dispatch(deleteTag(val));
}
export function onUpload({ file, name, type, size, rating, quality, tags }) {
  return dispatch => {
    dispatch(setUploadInit());

    const path = MediaUtil.getMediaPath(type);
    const formData = new FormData();
    formData.append('request', JSON.stringify({ name, rating, quality, tags, size }));
    formData.append('file', file);
  
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return AxiosUtil.post(`media/${path}`, formData, config)
      .then(progress => {
        dispatch(setProgressStatus(progress));
      })
      .catch(e => dispatch(setUploadInitFail(e.message)));
  }
}
export function onPollProgress(id) {
  return dispatch => {
    return AxiosUtil.get(`progress/${id}`)
    .then(progress => {
      dispatch(setProgressStatus(progress));
    })
    .catch(e => dispatch(setUploadInitFail(e.message)));
  }
}
export function onRetainName(val) {
  return dispatch => dispatch(setRetainName(val))
}