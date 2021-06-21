import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Videocam from '@material-ui/icons/Videocam';

export const IMAGE = "IMAGE";
export const VIDEO = "VIDEO";

export function getMediaType(type) {
  if (type.toLowerCase().includes('image')) {
    return IMAGE;
  } else if (type.toLowerCase().includes('video')) {
    return VIDEO;
  }
}

export function getMediaIcon(type) {
  console.log('searchType ', type);
  const mediaType = getMediaType(type);
  if (mediaType === IMAGE) {
    return <PhotoCamera color="secondary" />;
  } else if (mediaType === VIDEO) {
    return <Videocam color="secondary" />;
  }
}

export function  prettifyFileSize(size) {
  var i = Math.floor( Math.log(size) / Math.log(1024) );
  return ( size / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}

export function getQuality(code) {
  if (code == 4) {
    return "HD";
  } else if (code == 3) {
    return "HI";
  } else if (code == 2) {
    return "MD";
  } else if (code == 1) {
    return "LO";
  }
  return "MD";
}

export function getQualityCode(val) {
  if (val === 'HD') {
    return 4;
  } else if (val === 'HI') {
    return 3;
  } else if (val === 'MD') {
    return 2;
  } else if (val === 'LO') {
    return 1;
  }
  return 2;
}