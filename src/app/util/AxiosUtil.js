import axios from 'axios';

export const HOST = 'http://localhost:9010/';

export function post(path, data={}, config={}) {
  return axios
  .post(HOST + path , data, config)
  .then(res => {
    console.log(res);
    return res.data;
  });
}

export function get(path, config={}) {
  return axios
  .get(HOST + path, config)
  .then(res => {
    console.log(res);
    return res.data;
  });
}

export function getThumbnail(type, id) {
  return HOST + `/${type.toLowerCase()}/${id}/thumb`;
}

export function getContent(type, id) {
  return HOST + `/${type.toLowerCase()}/${id}/content`;
}
