import FullscreenIcon from '@material-ui/icons/Fullscreen';
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
  return `${AxiosUtil.getHost()}/content/${getMediaPath(type)}/${id}/thumb`;
}
export function getContentUrl(type, id) {
  return `${AxiosUtil.getHost()}/content/${getMediaPath(type)}/${id}`;
}
export function getIdentfiedType(fileType) {
  const medidaType = getMediaTypes().find(m => fileType.includes(m.mimeIncludes));
  return medidaType ? medidaType.code : null;
}
export function getPlayer(type, id) {
  return type === "V"
      ? <video controls autoPlay src={getContentUrl(type, id)} width="100%" height={380} />
      : (<div style={{ position: "relative" }}>
          <img src={getContentUrl(type, id)} height={380} />
          <FullscreenIcon color="primary" style={{ position: "absolute", bottom: 0, right: 0 }} />
        </div>
        )
}
export function getLocalPlayer(type, url, className) {
  return type === "V"
      ? <video className={className} src={url} />
      : <img className={className} src={url} />
}