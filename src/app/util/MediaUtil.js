import * as AxiosUtil from './AxiosUtil';

export const IMAGE = 'I';
export const VIDEO = 'V';

export function getMediaTypes() {
  return [
    { code: IMAGE, name: 'Images', color: '#1976d2', path: 'image', mimeIncludes: 'image' },
    { code: VIDEO, name: 'Videos', color: '#e53935', path: 'video', mimeIncludes: 'video'}
  ];
}
export function getMediaName(code) {
  return getMediaTypes().find(m => m.code === code).name;
}
export function getMediaColor(code) {
  return getMediaTypes().find(m => m.code === code).color;
}
export function getMediaPath(code) {
  return getMediaTypes().find(m => m.code === code).path;
}
export function  prettifyFileSize(size) {
  var i = Math.floor( Math.log(size) / Math.log(1024) );
  return ( size / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}
export function getThumbnailUrl(type, id) {
  return `${AxiosUtil.getHost()}content/v3/${getMediaPath(type)}/${id}/thumb`;
}
export function getContentUrl(type, id) {
  return `${AxiosUtil.getHost()}content/v3/${getMediaPath(type)}/${id}`;
}
export function getIdentfiedType(fileType) {
  const medidaType = getMediaTypes().find(m => fileType.includes(m.mimeIncludes));
  return medidaType ? medidaType.code : null;
}
export function getInlinePlayer(type, id, classes) {
  return type === "V"
      ? <video controls autoPlay src={getContentUrl(type, id)} className={classes} />
      : <img src={getContentUrl(type, id)} className={classes} />
}
export function getLocalPlayer(type, url, className) {
  return type === "V"
      ? <video className={className} src={url} />
      : <img className={className} src={url} />
}