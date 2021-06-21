import * as AxiosUtil from '../../app/util/AxiosUtil';
import * as MediaUtil from '../../app/util/MediaUtil';

export function upload(fileInfo, file) {
  const mediaType = MediaUtil.getMediaType(fileInfo.type);
  console.log("mediaType: ", mediaType);

  const path = mediaType === MediaUtil.IMAGE ? 'image' : 'video';
  const formData = new FormData();
  formData.append('request', JSON.stringify({
    name: fileInfo.name,
    rating: fileInfo.rating,
    quality: MediaUtil.getQuality(fileInfo.quality),
    tags: fileInfo.tags,
    size: fileInfo.size
  }));
  formData.append('file', file);

  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }
  return AxiosUtil.post(path, formData, config);
}