import * as WatchActionTypes from '../actiontypes/WatchActionTypes';
import * as AxiosUtil from '../../app/util/AxiosUtil';

export const setWatchMedia = (media) => {
  const newMedia = { ...media, views: media.views + 1, lastSeen: new Date().getTime() };
  return { type: WatchActionTypes.SET_MEDIA, payload: newMedia };
};
const setEditingNameStart = () => {
  return { type: WatchActionTypes.SET_EDITING_NAME_START };
};
const setName = () => {
  return { type: WatchActionTypes.SET_MEDIA_NAME };
};
const setEditingNameEnd = (value) => {
  return { type: WatchActionTypes.SET_EDITING_NAME_END, payload: value };
};
const setRating = (value) => {
  return { type: WatchActionTypes.SET_RATING, payload: value };
};
const setQuality = (value) => {
  return { type: WatchActionTypes.SET_QUALITY, payload: value };
};
const setTags = (value) => {
  return { type: WatchActionTypes.SET_TAGS, payload: value };
};
const addLike = () => {
  return { type: WatchActionTypes.ADD_LIKE };
};

export function onWatchMedia(media) {
  return dispatch => {
    dispatch(setWatchMedia(media));
    updateMedia(dispatch, media.id, 'views');
  }
}
export function updateNameStart() {
  return dispatch => dispatch(setEditingNameStart());
}
export function updateName(val) {
  return dispatch => dispatch(setName(val));
}
export function updateNameEnd(id, val) {
  return dispatch => updateMedia(dispatch, id, 'name', val);
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
export function updateViews(id, val) {
  return dispatch => updateMedia(dispatch, id, 'views', val);
}
export function updateLike(id, val) {
  return dispatch => updateMedia(dispatch, id, 'likes', val);
}

export function updateMedia(dispatch, id, field, val) {
  const request = {
    name: field === 'name' ? val : "",
    rating: field === 'rating' ? val : 0,
    quality: field === 'quality' ? val : 0,
    tags: field === 'tags' ? val : [],
    addView: field === 'views',
    addLike: field === 'likes',
  };
  let path = `media/${id}`;
  return AxiosUtil.put(path, request)
  .then(() => {
    if (field === 'name') dispatch(setEditingNameEnd(val));
    if (field === 'rating') dispatch(setRating(val));
    if (field === 'quality') dispatch(setQuality(val));
    if (field === 'tags') dispatch(setTags(val));
    if (field === 'likes') dispatch(addLike());
  });
}
