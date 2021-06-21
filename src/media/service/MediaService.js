import * as AxiosUtil from '../../app/util/AxiosUtil';
import * as MediaUtil from '../../app/util/MediaUtil';

export function update(type, id, field, val) {
  const mediaType = MediaUtil.getMediaType(type);
  let path = (mediaType === MediaUtil.IMAGE ? 'image' : 'video') + `/${id}/`
    + `?name=${field === 'name' ? val : ""}`
    + `&tags=${field === 'tags' ? val : ""}`
    + `&rating=${field === 'rating' ? val : 0}`
    + `&quality=${field === 'quality' ? val : ""}`
    + `&view=${field === 'views'}`
    + `&like=${field === 'likes'}`
  return AxiosUtil.post(path);
}
