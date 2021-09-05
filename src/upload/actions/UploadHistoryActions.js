import * as UploadHistoryActionTypes from '../actiontypes/UploadHistoryActionTypes';
import * as AxiosUtil from '../../app/util/AxiosUtil';
import * as MediaUtil from '../../app/util/MediaUtil';

const setUploadHistory = (history) => {
  return { type: UploadHistoryActionTypes.SET_UPLOAD_HISTORY, payload: history }
};
const setRating = (id, value) => {
  return { type: UploadHistoryActionTypes.SET_RATING, payload: { id, value } };
};
const setQuality = (id, value) => {
  return { type: UploadHistoryActionTypes.SET_QUALITY, payload: { id, value } };
};
const setTags = (id, value) => {
  return { type: UploadHistoryActionTypes.SET_TAGS, payload: { id, value } };
};

export function onLoadUploadHistory(mode) {
  return dispatch => {
    return AxiosUtil.get(`media/${MediaUtil.getMediaPath(mode)}`)
    .then(history => dispatch(setUploadHistory(history)))
    .catch(e => {
      console.log(e);
      alert(e);
    });
  }
}
export function updateRating(id, val) {
  return dispatch => updateMedia(dispatch, id, 'rating', val);
}
export function updateQuality(id, val) {
  return dispatch => updateMedia(dispatch, id, 'quality', val);
}
export function updateTags(id, val) {
  return dispatch => updateMedia(dispatch, id, 'tags', val);
}

export function updateMedia(dispatch, id, field, val) {
  const request = {
    rating: field === 'rating' ? val : 0,
    quality: field === 'quality' ? val : 0,
    tags: field === 'tags' ? val : []
  };
  let path = `media/${id}`;
  return AxiosUtil.put(path, request)
  .then(() => {
    if (field === 'rating') dispatch(setRating(id, val));
    if (field === 'quality') dispatch(setQuality(id, val));
    if (field === 'tags') dispatch(setTags(id, val));
  });
}
