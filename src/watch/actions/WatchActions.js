import * as WatchActionTypes from '../actiontypes/WatchActionTypes';
import * as AxiosUtil from '../../app/util/AxiosUtil';
import * as MediaUtil from '../../app/util/MediaUtil';

const setWatchMedia = (media) => {
  return { type: WatchActionTypes.SET_MEDIA, payload: media };
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

const addView = () => {
  return { type: WatchActionTypes.ADD_VIEW };
};

const addLike = () => {
  return { type: WatchActionTypes.ADD_LIKE };
};

export function onWatchMedia(media) {
  return dispatch => {
    dispatch(setWatchMedia(media));
  }
}
export function updateRating(id, val) {
  return dispatch => updateMedia(dispatch, id, 'ratng', val)
}
export function updateQuality(id, val) {
  return dispatch => updateMedia(dispatch, id, 'quality', val)
}
export function updateTags(id, val) {
  return dispatch => updateMedia(dispatch, id, 'tags', val)
}
export function updateViews(id, val) {
  return dispatch => updateMedia(dispatch, id, 'views', val)
}
export function updateLike(id, val) {
  return dispatch => updateMedia(dispatch, id, 'likes', val)
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
  AxiosUtil.put(path, request)
  .then(() => {
    if (field === 'rating') dispatch(setRating(val));
    if (field === 'quality') dispatch(setQuality(val));
    if (field === 'tags') dispatch(setTags(val));
    if (field === 'views') dispatch(addView());
    if (field === 'likes') dispatch(addLike());
  });
}
