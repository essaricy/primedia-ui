import * as AxiosUtil from '../../app/util/AxiosUtil';
import * as MediaUtil from '../../app/util/MediaUtil';

export function search(type, text) {
  const path = type === MediaUtil.IMAGE ? 'image' : 'video';
  return AxiosUtil.get(path + "?s="+text);
}