import * as UploadActionTypes from '../actiontypes/UploadActionTypes';
import * as UploadConstants from '../constants/UploadConstants';
import * as AxiosUtil from '../../app/util/AxiosUtil';
import * as MediaUtil from '../../app/util/MediaUtil';

const setSelectedFile = (file) => { return { type: UploadActionTypes.SELECT_FILE, payload: file } };
const setName = (value) => { return { type: UploadActionTypes.SET_MEDIA_NAME, payload: value } };
const setRating = (rating) => { return { type: UploadActionTypes.SET_RATING, payload: rating } };
const setQuality = (quality) => { return { type: UploadActionTypes.SET_QUALITY, payload: quality } };
const addTag = (tag) => { return { type: UploadActionTypes.ADD_TAG, payload: tag } };
const deleteTag = (tag) => { return { type: UploadActionTypes.DELETE_TAG, payload: tag } };
const setRetainName = (val) => { return { type: UploadActionTypes.SET_RETAIN_NAME, payload: val }; };

const setUploadMessage = (type, e) => {
  console.log('setUploadMessage: ', e);
  let message = null;
  if (type === 'media') {
    message = UploadConstants.getMediaTypeError();
  } else if (type === 'upload') {
    message = UploadConstants.getUploadServiceError();
  } else if (type === 'progress_expired') {
    message = UploadConstants.getExpiredProgressError();
  } else if (type === 'progress') {
    message = UploadConstants.getUploadServiceError();
  }  
  return { type: UploadActionTypes.SET_UPLOAD_ERROR, payload: message }
};
const setUploadStart = () => { return { type: UploadActionTypes.SET_UPLOAD_START } };
const setProgressStatus = (progress) => {
  return { type: UploadActionTypes.SET_PROGRESS_STATUS, payload: progress }
};
const setUploadHistory = (history) => {
  return {
    type: UploadActionTypes.SET_UPLOAD_HISTORY,
    payload: history
  }
}

export function onNameChange(val) { return dispatch => dispatch(setName(val)) }
export function onRatingChange(val) { return dispatch => dispatch(setRating(val)) }
export function onQualityChange(val) { return dispatch => dispatch(setQuality(val)) }
export function onTagAdd(val) { return dispatch => dispatch(addTag(val)) }
export function onTagDelete(val) { return dispatch => dispatch(deleteTag(val)) }
export function onRetainName(val) { return dispatch => dispatch(setRetainName(val)) }
export function onFileSelect(file) {
  return dispatch => {
    const type = MediaUtil.getIdentfiedType(file.type);
    type == null
    ? dispatch(setUploadMessage('media'))
    : dispatch(setSelectedFile(file));
  }
}
export function onUpload({ file, name, type, size, rating, quality, tags }) {
  return dispatch => {
    dispatch(setUploadStart());

    const path = MediaUtil.getMediaPath(type);
    const formData = new FormData();
    formData.append('request', JSON.stringify({ name, rating, quality, tags, size }));
    formData.append('file', file);
    const config = { headers: { 'content-type': 'multipart/form-data' } }

    return AxiosUtil.post(`media/${path}`, formData, config)
      .then(progress => dispatch(setProgressStatus(progress)))
      .catch(e => dispatch(setUploadMessage('upload', e)));  
  }
}
export function onPollProgress(id) {
  return dispatch => {
    return AxiosUtil.get(`progress/id/${id}`)
    .then(progress => {
      dispatch(setProgressStatus(progress));
    })
    .catch(e => {
      if (e.response && e.response.status === 500) {
        dispatch(setUploadMessage('progress_expired', e));
      } else {
        dispatch(setUploadMessage('progress', e));
      }
    });
  }
}
export function onLoadUploadHistory(mode) {
  return dispatch => {
    return AxiosUtil.get(`progress/${MediaUtil.getMediaPath(mode)}`)
    .then(history => dispatch(setUploadHistory(history)))
    .catch(e => {
      console.log(e);
      alert(e);
    });
  }
}
