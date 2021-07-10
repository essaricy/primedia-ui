import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Videocam from '@material-ui/icons/Videocam';

import * as AxiosUtil from './AxiosUtil';

export const IMAGE = "IMAGE";
export const VIDEO = "VIDEO";


export function getMediaTypes() {
  return [ { code: 'I', name: 'Images'}, { code: 'V', name: 'Videos'}];
}

export function getMediaIcon(code) {
  return code === "V" ? <Videocam color="secondary" /> : <PhotoCamera color="secondary" />;
}

export function getMediaName(code) {
  return getMediaTypes().find(m => m.code === code).name;
}

/////////////////////////////





export function getMediaType(type) {
  return type.toLowerCase() === 'v' ? VIDEO : IMAGE;
}

export function getIdentfiedType(type) {
  if (type.toLowerCase().includes('video')) {
    return VIDEO;
  } else if (type.toLowerCase().includes('image')) {
    return IMAGE;
  };
  return null;
}

export function getMediaPathPart(type) {
  const mediaType = getMediaType(type);
  return mediaType === VIDEO ? 'V' : 'I';
}



export function getMediaTypeLabel(type) {
  return type === "V" || type == "VIDEO" ? 'Videos' : 'Images';
}

export function getPlayer(type, id) {
  const mediaType = getMediaType(type);
  return mediaType === VIDEO
      ? <video controls autoPlay src={getContentUrl(type, id)} width="100%" height={520} />
      : <img src={getContentUrl(type, id)} width="100%" />
}

export function  prettifyFileSize(size) {
  var i = Math.floor( Math.log(size) / Math.log(1024) );
  return ( size / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}

export function getContentUrl(type, id) {
  return `${AxiosUtil.getHost()}/content/${type}/${id}`;
}

export function getThumbnailUrl(type, id) {
  return `${AxiosUtil.getHost()}/content/${type}/${id}/thumb`;
}
