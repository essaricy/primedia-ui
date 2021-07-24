import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Videocam from '@material-ui/icons/Videocam';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import * as AxiosUtil from './AxiosUtil';

export function getMediaTypes() {
  return [
    { code: 'I', name: 'Images', path: 'image', mimeIncludes: 'image' },
    { code: 'V', name: 'Videos', path: 'video', mimeIncludes: 'video'}
  ];
}
export function getMediaIcon(code) {
  return code === "V" ? <Videocam color="secondary" /> : <PhotoCamera color="secondary" />;
}
export function getMediaName(code) {
  return getMediaTypes().find(m => m.code === code).name;
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