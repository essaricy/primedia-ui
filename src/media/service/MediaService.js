import * as AxiosUtil from '../../app/util/AxiosUtil';

export function update(type, id, field, val) {
  let path = `media/${id}`;
  const request = {
    name: field === 'name' ? val : "",
    rating: field === 'rating' ? val : 0,
    quality: field === 'quality' ? val : 0,
    tags: field === 'tags' ? val : [],
    addView: field === 'views',
    addLike: field === 'likes',
  };
  return AxiosUtil.put(path, request);
}
