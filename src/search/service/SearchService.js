import * as AxiosUtil from '../../app/util/AxiosUtil';
import * as MediaUtil from '../../app/util/MediaUtil';

export function search(type, text) {
  return AxiosUtil.get(`media/${MediaUtil.getMediaPathPart(type)}?s=${text}`);
}